import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import moment from 'moment';
import { EditorState, RichUtils, ContentState, convertToRaw } from 'draft-js';

import ReduxForm from './components/ReduxForm';
import Highlight from './components/Highlight';
import {
  MenuItem,
  ListItem,
  Grid,
  Typography,
  TextField
} from '@material-ui/core';
import Button from '../src/Button';
import { Field } from 'redux-form/immutable';
import StyledTableSortLabel from './components/StyledTableSortLabel';
import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import MomentUtils from '@date-io/moment';
import ButtonMenu from '../src/lab/ButtonMenu';
import DataList from '../src/lab/DataList';
import DatePickerField from '../src/lab/DatePickerField';
import FormControlEditor from '../src/lab/FormControlEditor';
import FormControlEditorField from '../src/lab/FormControlEditorField';

storiesOf('Lab', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .addDecorator(story => (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {story()}
    </MuiPickersUtilsProvider>
  ))
  .add(
    'ButtonMenu',
    () => (
      <ButtonMenu
        id="foo"
        button={<Button onClick={action('clicked 1')}>test</Button>}
      >
        <MenuItem onClick={action('clicked 2')}>item1</MenuItem>
        <MenuItem onClick={action('clicked 3')}>item2</MenuItem>
      </ButtonMenu>
    ),
    {
      info: {
        propTables: [ButtonMenu]
      }
    }
  )
  .add(
    'DataList',
    () => {
      const [page, setPage] = React.useState(0);
      let id = 0;
      function createData(name, calories, fat, carbs, protein) {
        id += 1;
        return { id, name, calories, fat, carbs, protein };
      }
      const columns = fromJS([
        [
          'id',
          'Dessert (100g serving)',
          'Calories',
          'Fat (g)',
          'Carbs (g)',
          'Protein (g)'
        ]
      ]);
      const assignments = fromJS([
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9)
      ]);
      const renderColumn = (
        rowData,
        index,
        { orderIndex, order, sortData }
      ) => {
        const onSortClick = () => {
          sortData({
            asc: data => data.sortBy(el => parseInt(el.get('id'))),
            desc: data => data.sortBy(el => -parseInt(el.get('id')))
          });
        };

        return (
          <ListItem key={`list-item-head-${index}`}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={1}>
                <StyledTableSortLabel
                  component="p"
                  active={0 === orderIndex}
                  direction={order}
                  onClick={() => onSortClick()}
                >
                  {rowData.get(0)}
                </StyledTableSortLabel>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography color="textSecondary" variant="body2">
                  {rowData.get(1)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData.get(2)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData.get(3)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData.get(4)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography color="textSecondary" variant="body2">
                  {rowData.get(5)}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
        );
      };
      const renderDataRow = (rowData, index) => {
        return (
          <ListItem button key={`list-item-${index}`}>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={1}>
                {rowData.get('id')}
              </Grid>
              <Grid item xs={12} sm={3}>
                {rowData.get('name')}
              </Grid>
              <Grid item xs={12} sm={2}>
                {rowData.get('calories')}
              </Grid>
              <Grid item xs={12} sm={2}>
                {rowData.get('fat')}
              </Grid>
              <Grid item xs={12} sm={2}>
                {rowData.get('carbs')}
              </Grid>
              <Grid item xs={12} sm={2}>
                {rowData.get('protein')}
              </Grid>
            </Grid>
          </ListItem>
        );
      };
      return (
        <React.Fragment>
          <Typography variant="h5">default</Typography>
          <TextField
            label="page"
            type="number"
            value={page}
            onChange={e => setPage(parseInt(e.target.value))}
          />
          <DataList
            component="nav"
            disablePadding
            columns={columns}
            data={assignments}
            showDivider={false}
            renderColumn={renderColumn}
            renderDataRow={renderDataRow}
            TablePaginationProps={{
              count: assignments.size,
              page,
              rowsPerPageOptions: [2, 4, 6, 8],
              rowsPerPage: 2,
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
            renderColumn={renderColumn}
            renderDataRow={renderDataRow}
            renderEmpty={() => <ListItem>Customized empty state.</ListItem>}
            TablePaginationProps={{
              count: 0,
              rowsPerPageOptions: [2, 4, 6, 8],
              rowsPerPage: 2,
              labelRowsPerPage: '每頁幾筆'
            }}
          />
        </React.Fragment>
      );
    },
    {
      info: {
        propTables: [DataList]
      }
    }
  )
  .add(
    'DatePickerField',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: moment(new Date())
        });
        const handleChange = values => {
          setValues({
            field1: values.get('field1').format('YYYY-MM-DD')
          });
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Field
                  label="datepicker with Field"
                  name="field1"
                  margin="normal"
                  datePickerFormat="YYYY-MM-DD"
                  component={DatePickerField}
                  fullWidth
                />
              </ReduxForm>
            </Grid>
            <Grid item xs={6}>
              <Highlight
                code={JSON.stringify(values, null, 4)}
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
        propTables: [DatePickerField]
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
          <FormControlEditor
            fullWidth
            label="editor1"
            EditorProps={{
              editorState: editorState,
              handleKeyCommand: handleKeyCommand,
              onChange: editorState => setEditorState(editorState)
            }}
          />
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
          )
        });

        const handleChange = values => {
          setValues({
            field1: values.get('field1')
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
                  label="editor1"
                  EditorProps={{
                    handleKeyCommand
                  }}
                />
              </ReduxForm>
            </Grid>
            <Grid item xs={6}>
              <Highlight
                code={JSON.stringify(
                  convertToRaw(values.field1.getCurrentContent()),
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
  );
