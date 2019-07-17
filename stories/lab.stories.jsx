import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import { EditorState, RichUtils, ContentState, convertToRaw } from 'draft-js';

import ReduxForm from './components/ReduxForm';
import Highlight from './components/Highlight';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@e-group/material/Button';
import { Field } from 'redux-form/immutable';
import StyledTableSortLabel from './components/StyledTableSortLabel';
import { Provider } from 'react-redux';
import ButtonMenu from '@e-group/material-lab/ButtonMenu';
import DataList from '@e-group/material-lab/DataList';
import FormControlEditor from '@e-group/material-lab/FormControlEditor';
import FormControlEditorField from '@e-group/material-lab/FormControlEditorField';
import SlateEditor from '@e-group/material-lab/SlateEditor';
import { Value } from 'slate'

storiesOf('Lab', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'ButtonMenu',
    () => {
      const Demo = () => (
        <ButtonMenu
          id="foo"
          button={<Button onClick={action('clicked 1')}>test</Button>}
        >
          <MenuItem onClick={action('clicked 2')}>item1</MenuItem>
          <MenuItem onClick={action('clicked 3')}>item2</MenuItem>
        </ButtonMenu>
      );
      return <Demo />;
    },
    {
      info: {
        propTables: [ButtonMenu]
      }
    }
  )
  .add(
    'DataList',
    () => {
      let id = 0;
      function createData(name, calories, fat, carbs, protein) {
        id += 1;
        return { id, name, calories, fat, carbs, protein };
      }

      const assignments = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
      ]
        
      const columns = [
        'id',
        'Dessert (100g serving)',
        'Calories',
        'Fat (g)',
        'Carbs (g)',
        'Protein (g)'
      ]

      const Demo = () => {
        const [page, setPage] = React.useState(0);

        const renderColumns = (
          rowData,
          { orderIndex, order, sortData }
        ) => {
          const onSortClick = index => () => {
            sortData({
              activeOrderIndex: index,
              asc: data => data.sort((a, b) => b.id - a.id),
              desc: data => data.sort((a, b) => a.id - b.id)
            });
          };

          return (
            <ListItem>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={1}>
                  <StyledTableSortLabel
                    component="p"
                    active={0 === orderIndex ? true : false}
                    direction={order}
                    onClick={onSortClick(0)}
                  >
                    {rowData[0]}
                  </StyledTableSortLabel>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Typography color="textSecondary" variant="body2">
                    {rowData[1]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography color="textSecondary" variant="body2">
                    {rowData[2]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography color="textSecondary" variant="body2">
                    {rowData[3]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography color="textSecondary" variant="body2">
                    {rowData[4]}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Typography color="textSecondary" variant="body2">
                    {rowData[5]}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          );
        };

        const renderDataRow = (rowData, index) => {
          return (
            <ListItem button key={`list-item-${index}`}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={1}>
                  {rowData.id}
                </Grid>
                <Grid item xs={12} sm={3}>
                  {rowData.name}
                </Grid>
                <Grid item xs={12} sm={2}>
                  {rowData.calories}
                </Grid>
                <Grid item xs={12} sm={2}>
                  {rowData.fat}
                </Grid>
                <Grid item xs={12} sm={2}>
                  {rowData.carbs}
                </Grid>
                <Grid item xs={12} sm={2}>
                  {rowData.protein}
                </Grid>
              </Grid>
            </ListItem>
          );
        };

        const renderTableColumn = (
          rowData,
          { orderIndex, order, sortData }
        ) => {
          const onSortClick = index => () => {
            sortData({
              activeOrderIndex: index,
              asc: data => data.sort((a, b) => b.id - a.id),
              desc: data => data.sort((a, b) => a.id - b.id)
            });
          };

          return (
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={0 === orderIndex ? true : false}
                  direction={order}
                  onClick={onSortClick(0)}
                >
                  {rowData[0]}
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="body2">
                  {rowData[1]}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="body2">
                  {rowData[2]}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="body2">
                  {rowData[3]}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="body2">
                  {rowData[4]}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="body2">
                  {rowData[5]}
                </Typography>
              </TableCell>
            </TableRow>
          );
        };

        const renderTableDateRow = (rowData, index) => {
          return (
            <TableRow key={`table-item-${index}`}>
              <TableCell>
                {rowData.id}
              </TableCell>
              <TableCell>
                {rowData.name}
              </TableCell>
              <TableCell>
                {rowData.calories}
              </TableCell>
              <TableCell>
                {rowData.fat}
              </TableCell>
              <TableCell>
                {rowData.carbs}
              </TableCell>
              <TableCell>
                {rowData.protein}
              </TableCell>
            </TableRow>
          );
        };

        return (
          <React.Fragment>
            <Typography variant="h5">default</Typography>
            <TextField
              label="Change Page"
              type="number"
              value={page}
              onChange={e => setPage(parseInt(e.target.value))}
            />
            <DataList
              to={page}
              component="nav"
              disablePadding
              columns={columns}
              data={assignments}
              hideListHeadDivider
              renderColumns={renderColumns}
              renderDataRow={renderDataRow}
              defaultRowsPerPage={2}
              MuiTablePaginationProps={{
                count: assignments.length,
                rowsPerPageOptions: [2, 4, 6, 8],
                labelRowsPerPage: '每頁幾筆'
              }}
            />
            <Typography variant="h5">with loading</Typography>
            <DataList
              component="nav"
              disablePadding
              serverSide
              loading
              columns={columns}
              data={assignments}
              renderColumns={renderColumns}
              renderDataRow={renderDataRow}
              MuiTablePaginationProps={{
                count: 0,
                labelRowsPerPage: '每頁幾筆'
              }}
            />
            <Typography variant="h5">with empty state</Typography>
            <DataList
              component="nav"
              disablePadding
              columns={columns}
              data={assignments}
              isEmpty
              renderColumns={renderColumns}
              renderDataRow={renderDataRow}
              localization={{
                emptyMessage: '無資料'
              }}
              // renderEmpty={() => <ListItem>Customized empty state.</ListItem>}
              MuiTablePaginationProps={{
                count: 0,
                labelRowsPerPage: '每頁幾筆'
              }}
            />
            <Typography variant="h5">variant Table</Typography>
            <DataList
              variant="table"
              columns={columns}
              data={assignments}
              renderColumns={renderTableColumn}
              renderDataRow={renderTableDateRow}
              defaultPage={1}
              MuiTablePaginationProps={{
                count: assignments.length,
                labelRowsPerPage: '每頁幾筆'
              }}
            />
          </React.Fragment>
        );
      };
      return <Demo />;
    },
    {
      info: {
        propTables: [DataList]
      }
    }
  )
  .add(
    'FormControlEditor',
    () => {
      const MyFormControllEditor = () => {
        const [editorState, setEditorState] = React.useState(
          EditorState.createWithContent(
            ContentState.createFromText('I am draft editor please edit me.')
          )
        );

        const handleKeyCommand = (command, editorState) => {
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            setEditorState(newState);
            return 'handled';
          }
          return 'not-handled';
        };

        return (
          <React.Fragment>
            <FormControlEditor
              fullWidth
              label="error"
              helperText="helperText"
              EditorProps={{
                editorState: editorState,
                handleKeyCommand: handleKeyCommand,
                onChange: editorState => setEditorState(editorState)
              }}
            />
          </React.Fragment>
        );
      };
      return <MyFormControllEditor />;
    },
    {
      info: {
        propTables: [FormControlEditor]
      }
    }
  )
  .add(
    'FormControlEditorField',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: EditorState.createWithContent(
            ContentState.createFromText('I am draft editor please edit me.')
          ),
          field2: EditorState.createWithContent(
            ContentState.createFromText('I am draft editor please edit me.')
          ),
          field3: EditorState.createWithContent(
            ContentState.createFromText('I am draft editor please edit me.')
          )
        });

        const handleChange = values => {
          setValues({
            field1: values.get('field1'),
            field2: values.get('field2'),
            field3: values.get('field3'),
          });
        };

        const handleKeyCommand = (command, editorState, { input }) => {
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            input.onChange(newState);
            return 'handled';
          }
          return 'not-handled';
        };

        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Field
                  component={FormControlEditorField}
                  name="field1"
                  fullWidth
                  margin="normal"
                  label="default"
                />
                <Field
                  component={FormControlEditorField}
                  name="field2"
                  fullWidth
                  margin="normal"
                  label="with handleKeyCommand"
                  EditorProps={{
                    handleKeyCommand
                  }}
                />
                <Field
                  component={FormControlEditorField}
                  name="field3"
                  fullWidth
                  margin="normal"
                  label="with error"
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{
                    invalid: true,
                    touched: true,
                    error: 'error message'
                  }}
                />
              </ReduxForm>
            </Grid>
            <Grid item xs={6}>
              <Highlight
                code={
                  JSON.stringify({
                    field1: convertToRaw(values.field1.getCurrentContent()),
                    field2: convertToRaw(values.field2.getCurrentContent())
                  },
                  null,
                  4
                )}
                type="language-json"
              />
            </Grid>
          </Grid>
        );
      };
      return <Form />;
    },
    {
      info: {
        propTables: [FormControlEditor]
      }
    }
  )
  .add(
    'SlateEditor',
    () => {
      const initialValue = Value.fromJSON({
        document: {
          nodes: [
            {
              object: 'block',
              type: 'paragraph',
              nodes: [
                {
                  object: 'text',
                  text: 'A line of text in a paragraph.',
                },
              ],
            },
          ],
        },
      })
      function MarkHotkey(options) {
        // Grab our options from the ones passed in.
        const { type, key } = options

        // Return our "plugin" object, containing the `onKeyDown` handler.
        return {
          onKeyDown(event, editor, next) {
            // If it doesn't match our `key`, let other plugins handle it.
            if (!event.ctrlKey || event.key != key) return next()

            // Prevent the default characters from being inserted.
            event.preventDefault()

            // Toggle the mark `type`.
            editor.toggleMark(type)
          },
        }
      }
      const plugins = [
        MarkHotkey({ key: 'b', type: 'bold' }),
        MarkHotkey({ key: '`', type: 'code' }),
        MarkHotkey({ key: 'i', type: 'italic' }),
        MarkHotkey({ key: '~', type: 'strikethrough' }),
        MarkHotkey({ key: 'u', type: 'underline' }),
      ]
      const Demo = () => {
        const [value, setValue] = React.useState(initialValue)

        const onChange = ({ value }) => {
          setValue(value)
        }
        // Add a `renderMark` method to render marks.
        const renderMark = (props, editor, next) => {
          switch (props.mark.type) {
            case 'bold':
              return <strong>{props.children}</strong>
            // Add our new mark renderers...
            case 'code':
              return <code>{props.children}</code>
            case 'italic':
              return <em>{props.children}</em>
            case 'strikethrough':
              return <del>{props.children}</del>
            case 'underline':
              return <u>{props.children}</u>
            default:
              return next()
          }
        }
        return (
          <SlateEditor
            plugins={plugins}
            value={value}
            onChange={onChange}
            renderMark={renderMark}
          />
        )
      };
      return <Demo />;
    },
    {
      info: {
        propTables: [ButtonMenu]
      }
    }
  );
