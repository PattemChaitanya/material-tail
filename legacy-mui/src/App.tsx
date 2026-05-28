import React from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { Checkbox } from "./components/Checkbox";
import { Switch } from "./components/Switch";
import { Radio } from "./components/Radio";
import { Select } from "./components/Select";
import { TextField } from "./components/TextField";
import { Slider } from "./components/Slider";
import { Progress } from "./components/Progress";
import { Chip } from "./components/Chip";
import { Badge } from "./components/Badge";
import { Alert } from "./components/Alert";
import { Avatar } from "./components/Avatar";
import { Tooltip } from "./components/Tooltip";
import { Dialog } from "./components/Dialog";
import { Snackbar } from "./components/Snackbar";
import { Menu } from "./components/Menu";
import { Tabs } from "./components/Tabs";
import { Mention } from "./components/Mention";
import { Table } from "./components/Table";
import { Pagination } from "./components/Pagination";
import { List } from "./components/List";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { Paper } from "./components/Paper";
// import { IconButton } from "./components/IconButton";

const App: React.FC = () => {
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(
    null
  );

  return (
    <div className="App">
      <Header.Root>
        <Header.Toolbar>
          <Header.Brand title="Material UI Clone" />
          <Header.Nav>
            <Button variant="text">Home</Button>
            <Button variant="text">About</Button>
          </Header.Nav>
          <Header.Actions>
            <Button onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
              Menu
            </Button>
          </Header.Actions>
        </Header.Toolbar>
      </Header.Root>
      <div className="App-container">
        {/* <Sidebar.Root>
          <Sidebar.Header>
            <Sidebar.Title>Navigation</Sidebar.Title>
          </Sidebar.Header>
          <Sidebar.Body>
            <Button variant="text" fullWidth>
              Home
            </Button>
            <Button variant="text" fullWidth>
              About
            </Button>
            <Button variant="text" fullWidth>
              Settings
            </Button>
          </Sidebar.Body>
        </Sidebar.Root> */}
        <main className="App-main">
          <div className="components-grid">
            <section className="component-section">
              <h2>Basic Components</h2>
              <div className="component-demo">
                <div className="button-examples">
                  <Button variant="contained" color="primary">
                    Contained Button
                  </Button>
                  <Button variant="outlined" color="secondary">
                    Outlined Button
                  </Button>
                  <Button variant="text" color="primary">
                    Text Button
                  </Button>
                  <Button disabled>Disabled Button</Button>
                </div>
                <Input />
                <Checkbox />
                <Switch />
                <Radio.Root>
                  <Radio.Group>
                    <Radio.Item label="Option 1" value="1" />
                    <Radio.Item label="Option 2" value="2" />
                  </Radio.Group>
                </Radio.Root>
                <Select
                  options={[
                    { label: "Option 1", value: "1" },
                    { label: "Option 2", value: "2" },
                  ]}
                />
                <TextField />
              </div>
            </section>

            <section className="component-section">
              <h2>Data Display</h2>
              <div className="component-demo">
                <Slider />
                <Progress />
                <Chip label="Chip" />
                <Badge />
                <Alert />
                <Avatar />
              </div>
            </section>

            <section className="component-section">
              <h2>Feedback</h2>
              <div className="component-demo">
                <Tooltip title="Tooltip">
                  <Button>Hover me</Button>
                </Tooltip>
                <Dialog.Root open={false} onClose={() => {}}>
                  <Dialog.Title>Dialog Title</Dialog.Title>
                  <Dialog.Content>Dialog content goes here</Dialog.Content>
                  <Dialog.Actions>
                    <Button onClick={() => {}}>Cancel</Button>
                    <Button onClick={() => {}}>OK</Button>
                  </Dialog.Actions>
                </Dialog.Root>
                <Snackbar
                  open={snackbarOpen}
                  onClose={() => setSnackbarOpen(false)}
                  message="This is a snackbar message"
                />
                <Menu.Root
                  open={menuOpen}
                  onClose={() => setMenuOpen(false)}
                  anchorEl={menuAnchorEl}
                >
                  <Menu.Item onClick={() => {}}>Profile</Menu.Item>
                  <Menu.Item onClick={() => {}}>Settings</Menu.Item>
                  <Menu.Item onClick={() => {}}>Logout</Menu.Item>
                </Menu.Root>
              </div>
            </section>

            <section className="component-section">
              <h2>Navigation</h2>
              <div className="component-demo">
                <Tabs.Root value={0} onChange={() => {}}>
                  <Tabs.Panel value={0} label="Tab 1">
                    Content 1
                  </Tabs.Panel>
                  <Tabs.Panel value={1} label="Tab 2">
                    Content 2
                  </Tabs.Panel>
                  <Tabs.Panel value={2} label="Tab 3">
                    Content 3
                  </Tabs.Panel>
                </Tabs.Root>
                <Mention.Root
                  value=""
                  onChange={() => {}}
                  users={[
                    { id: "1", name: "John Doe" },
                    { id: "2", name: "Jane Smith" },
                  ]}
                />
                <Table.Root
                  columns={[
                    { id: "name", label: "Name" },
                    { id: "age", label: "Age" },
                  ]}
                  data={[
                    { id: "1", name: "John", age: 30 },
                    { id: "2", name: "Jane", age: 25 },
                  ]}
                />
                <Pagination.Root
                  page={1}
                  count={10}
                  rowsPerPage={5}
                  onPageChange={() => {}}
                />
                <List.Root>
                  <List.Item>Item 1</List.Item>
                  <List.Item>Item 2</List.Item>
                  <List.Item>Item 3</List.Item>
                </List.Root>
              </div>
            </section>

            <section className="component-section">
              <h2>Layout</h2>
              <div className="component-demo">
                <Card.Root>
                  <Card.Header title="Card Title" />
                  <Card.Content>Card content goes here</Card.Content>
                  <Card.Actions>
                    <Button>Action 1</Button>
                    <Button>Action 2</Button>
                  </Card.Actions>
                </Card.Root>
                <Paper>Paper content goes here</Paper>
                {/* <IconButton /> */}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
