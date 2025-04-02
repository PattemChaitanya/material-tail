import React, { useCallback, useEffect, useRef, useState } from "react";
import { styled } from "../../utils/styled";
import { useTheme } from "../../theme";

export type MentionColor =
  | "primary"
  | "secondary"
  | "error"
  | "warning"
  | "info"
  | "success"
  | "default";

export interface MentionUser {
  id: string;
  name: string;
  avatar?: string;
}

export interface MentionProps {
  value: string;
  onChange: (value: string) => void;
  users: MentionUser[];
  color?: MentionColor;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  minLength?: number;
  onMentionSelect?: (user: MentionUser) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
}

const MentionWrapper = styled.div<{
  color?: MentionColor;
  disabled?: boolean;
  theme: any;
}>`
  position: relative;
  width: 100%;
  border: 1px solid
    ${({ color = "primary", disabled, theme }) =>
      disabled ? theme.palette.action.disabled : theme.palette[color].main};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.palette.action.disabledBackground : "transparent"};
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: ${({ color = "primary", disabled, theme }) =>
      disabled ? theme.palette.action.disabled : theme.palette[color].dark};
  }

  &:focus-within {
    border-color: ${({ color = "primary", disabled, theme }) =>
      disabled ? theme.palette.action.disabled : theme.palette[color].main};
    box-shadow: 0 0 0 2px
      ${({ color = "primary", disabled, theme }) =>
        disabled ? "transparent" : `${theme.palette[color].main}40`};
  }
`;

const MentionTextarea = styled.textarea<{
  color?: MentionColor;
  disabled?: boolean;
  readOnly?: boolean;
  theme: any;
}>`
  width: 100%;
  min-height: 100px;
  padding: 8px 12px;
  border: none;
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  background-color: transparent;
  color: ${({ disabled, theme }) =>
    disabled ? theme.palette.action.disabled : theme.palette.text.primary};
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: ${({ disabled, theme }) =>
      disabled ? theme.palette.action.disabled : theme.palette.text.secondary};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:read-only {
    cursor: default;
  }
`;

const MentionSuggestions = styled.div<{
  visible: boolean;
  color?: MentionColor;
  theme: any;
}>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background-color: ${({ theme }) => theme.palette.background.paper};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.shape.borderRadius}px;
  box-shadow: ${({ theme }) => theme.shadows[4]};
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  display: ${({ visible }) => (visible ? "block" : "none")};
`;

const MentionSuggestionItem = styled.div<{
  selected: boolean;
  color?: MentionColor;
  theme: any;
}>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${({ selected, color = "primary", theme }) =>
    selected ? theme.palette[color].light : "transparent"};

  &:hover {
    background-color: ${({ color = "primary", theme }) =>
      theme.palette[color].light};
  }
`;

const MentionAvatar = styled.div<{
  src?: string;
  color?: MentionColor;
  theme: any;
}>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${({ color = "primary", theme }) =>
    theme.palette[color].main};
  background-image: ${({ src }) => (src ? `url(${src})` : "none")};
  background-size: cover;
  background-position: center;
`;

const MentionName = styled.span<{
  color?: MentionColor;
  theme: any;
}>`
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 0.875rem;
`;

const MentionHighlight = styled.span<{
  color?: MentionColor;
  theme: any;
}>`
  color: ${({ color = "primary", theme }) => theme.palette[color].main};
  font-weight: 500;
`;

export const MentionComponent: React.FC<MentionProps> = ({
  value,
  onChange,
  users,
  color = "primary",
  placeholder,
  disabled = false,
  readOnly = false,
  maxLength,
  minLength,
  onMentionSelect,
  onKeyDown,
  onFocus,
  onBlur,
}) => {
  const theme = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mentionQuery, setMentionQuery] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = event.target.value;
      const newCursorPosition = event.target.selectionStart;

      onChange(newValue);
      setCursorPosition(newCursorPosition);

      const beforeCursor = newValue.slice(0, newCursorPosition);
      const mentionMatch = beforeCursor.match(/@(\w*)$/);

      if (mentionMatch) {
        setMentionQuery(mentionMatch[1]);
        setShowSuggestions(true);
        setSelectedIndex(0);
      } else {
        setShowSuggestions(false);
      }
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!showSuggestions) {
        onKeyDown?.(event);
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredUsers.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredUsers.length - 1
          );
          break;
        case "Enter":
        case "Tab":
          event.preventDefault();
          if (filteredUsers[selectedIndex]) {
            insertMention(filteredUsers[selectedIndex]);
          }
          break;
        case "Escape":
          event.preventDefault();
          setShowSuggestions(false);
          break;
        default:
          onKeyDown?.(event);
      }
    },
    [showSuggestions, selectedIndex, filteredUsers, onKeyDown]
  );

  const insertMention = useCallback(
    (user: MentionUser) => {
      if (!textareaRef.current) return;

      const beforeCursor = value.slice(0, cursorPosition);
      const afterCursor = value.slice(cursorPosition);

      const mentionText = `@${user.name} `;
      const newValue = beforeCursor.replace(/@\w*$/, mentionText) + afterCursor;

      onChange(newValue);
      setShowSuggestions(false);
      onMentionSelect?.(user);

      // Focus back on textarea and place cursor after mention
      textareaRef.current.focus();
      const newCursorPosition = beforeCursor.length + mentionText.length;
      textareaRef.current.setSelectionRange(
        newCursorPosition,
        newCursorPosition
      );
    },
    [value, cursorPosition, onChange, onMentionSelect]
  );

  const handleSuggestionClick = useCallback(
    (user: MentionUser) => {
      insertMention(user);
    },
    [insertMention]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        textareaRef.current &&
        !textareaRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MentionWrapper color={color} disabled={disabled} theme={theme}>
      <MentionTextarea
        ref={textareaRef}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readOnly}
        maxLength={maxLength}
        minLength={minLength}
        color={color}
        theme={theme}
      />
      <MentionSuggestions visible={showSuggestions} color={color} theme={theme}>
        {filteredUsers.map((user, index) => (
          <MentionSuggestionItem
            key={user.id}
            selected={index === selectedIndex}
            color={color}
            theme={theme}
            onClick={() => handleSuggestionClick(user)}
          >
            <MentionAvatar src={user.avatar} color={color} theme={theme} />
            <MentionName color={color} theme={theme}>
              {user.name.slice(0, mentionQuery.length) && (
                <MentionHighlight color={color} theme={theme}>
                  {user.name.slice(0, mentionQuery.length)}
                </MentionHighlight>
              )}
              {user.name.slice(mentionQuery.length)}
            </MentionName>
          </MentionSuggestionItem>
        ))}
      </MentionSuggestions>
    </MentionWrapper>
  );
};

export const Mention = {
  Root: MentionComponent,
};
