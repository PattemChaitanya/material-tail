import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "../../utils/styled";
import { useTheme } from "../../theme";
import { Theme } from "../../theme/types";

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

interface MentionWrapperProps {
  color?: MentionColor;
  disabled?: boolean;
  theme: Theme;
}

const MentionWrapper = styled.div<MentionWrapperProps>`
  position: relative;
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.disabled
        ? props.theme.palette.action.disabled
        : props.theme.palette[props.color || "primary"].main};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  background-color: ${(props) =>
    props.disabled
      ? props.theme.palette.action.disabledBackground
      : "transparent"};
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: ${(props) =>
      props.disabled
        ? props.theme.palette.action.disabled
        : props.theme.palette[props.color || "primary"].dark};
  }

  &:focus-within {
    border-color: ${(props) =>
      props.disabled
        ? props.theme.palette.action.disabled
        : props.theme.palette[props.color || "primary"].main};
    box-shadow: 0 0 0 2px
      ${(props) =>
        props.disabled
          ? "transparent"
          : `${props.theme.palette[props.color || "primary"].main}40`};
  }
`;

interface MentionTextareaProps {
  color?: MentionColor;
  disabled?: boolean;
  readOnly?: boolean;
  theme: Theme;
}

const MentionTextarea = styled.textarea<MentionTextareaProps>`
  width: 100%;
  min-height: 100px;
  padding: 8px 12px;
  border: none;
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  background-color: transparent;
  color: ${(props) =>
    props.disabled
      ? props.theme.palette.action.disabled
      : props.theme.palette.text.primary};
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  resize: vertical;
  outline: none;

  &::placeholder {
    color: ${(props) =>
      props.disabled
        ? props.theme.palette.action.disabled
        : props.theme.palette.text.secondary};
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:read-only {
    cursor: default;
  }
`;

interface MentionSuggestionsProps {
  visible: boolean;
  color?: MentionColor;
  theme: Theme;
}

const MentionSuggestions = styled.div<MentionSuggestionsProps>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background-color: ${(props) => props.theme.palette.background.paper};
  border: 1px solid ${(props) => props.theme.palette.divider};
  border-radius: ${(props) => props.theme.shape.borderRadius}px;
  box-shadow: ${(props) => props.theme.shadows[4]};
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  display: ${(props) => (props.visible ? "block" : "none")};
`;

interface MentionSuggestionItemProps {
  selected: boolean;
  color?: MentionColor;
  theme: Theme;
}

const MentionSuggestionItem = styled.div<MentionSuggestionItemProps>`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected
      ? props.theme.palette[props.color || "primary"].light
      : "transparent"};

  &:hover {
    background-color: ${(props) =>
      props.theme.palette[props.color || "primary"].light};
  }
`;

interface MentionAvatarProps {
  src?: string;
  color?: MentionColor;
  theme: Theme;
}

const MentionAvatar = styled.div<MentionAvatarProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${(props) =>
    props.theme.palette[props.color || "primary"].main};
  background-image: ${(props) => (props.src ? `url(${props.src})` : "none")};
  background-size: cover;
  background-position: center;
`;

interface MentionNameProps {
  color?: MentionColor;
  theme: Theme;
}

const MentionName = styled.span<MentionNameProps>`
  color: ${(props) => props.theme.palette.text.primary};
  font-size: 0.875rem;
`;

interface MentionHighlightProps {
  color?: MentionColor;
  theme: Theme;
}

const MentionHighlight = styled.span<MentionHighlightProps>`
  color: ${(props) => props.theme.palette[props.color || "primary"].main};
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
