import React, {
  ChangeEvent,
  ReactNode,
  useRef,
  useState,
  MouseEvent,
  forwardRef,
} from 'react';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  withStyles,
  Theme,
  createStyles,
  WithStyles,
  InputAdornment,
  OutlinedInput,
  ClickAwayListenerProps,
} from '@material-ui/core';
import clsx from 'clsx';
import {
  ExpandMore,
  ExpandLess,
  Adjust,
  PanoramaFishEye,
  CheckBoxOutlined,
  CheckBoxOutlineBlankOutlined,
  Search,
  DoneOutlined,
} from '@material-ui/icons';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      boxShadow: theme.shadows[4],
      borderRadius: theme.shape.borderRadius,
      position: 'relative',
      '& > div': {
        width: '100%',
        top: '3px !important',
        height: 45,
        zIndex: 99,
      },
      '& .MuiButton-root': {
        borderColor: theme.egPalette.text[4],
        fontSize: 18,
        fontFamily: 'Muli-SemiBold',
        '&.open': {
          borderColor: theme.egPalette.info[1],
          color: theme.egPalette.info[1],
        },
      },
      '& .MuiButton-label': {
        display: 'flex',
        textTransform: 'initial',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& > span': {
          display: 'flex',
          alignItems: 'center',
          '&:first-child': {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        },
      },
    },
    list: {
      '&:focus': {
        outline: 'none',
      },
      '& li': {
        fontSize: 14,
        paddingLeft: 25,
        paddingBottom: 3,
        paddingTop: 3,

        '&:before': {
          content: 'none',
        },

        '&.check': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },

        '&.icon-list': {
          paddingLeft: 15,
          '& > div': {
            width: '100%',
            borderBottom: `1px solid ${theme.egPalette.text[3]}`,
            marginLeft: 10,
            paddingBottom: 2,
          },
          '& > div:last': {
            borderBottomColor: 'transparent',
          },
        },

        '&.select': {
          paddingLeft: 15,
          '& .MuiSvgIcon-root': {
            marginRight: 10,
          },
        },
      },
      '& .Mui-selected, & .Mui-selected:hover, & li:hover': {
        backgroundColor: theme.egPalette.info[1],
        color: theme.palette.common.white,
      },
      '& .Mui-selected.check, & .Mui-selected.check:hover, & li.check:hover': {
        backgroundColor: 'transparent',
        color: theme.egPalette.info[1],
      },
      '& div.groupTitle': {
        fontSize: 14,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingBottom: 5,
      },
    },
    search: {
      margin: 10,
      '& input.MuiInputBase-input': {
        padding: 10,
      },
      '& .MuiOutlinedInput-notchedOutline': {
        boxShadow: 'none',
        border: `2px solid ${theme.egPalette.text[4]}`,
      },
    },
    seperate: {
      width: 50,
    },
    disabled: {
      '& .MuiButton-root': {
        color: theme.egPalette.text[4],
        cursor: 'default',
        backgroundColor: '#3737370a',
      },
    },
  });

export type Group = {
  group: string;
};

export type Option =
  | {
      value: number | string;
      text: string;
      icon?: ReactNode;
    }
  | Group
  | string;
export interface DropDownProps {
  options: Option[];
  text?: string;
  className?: string;
  onChange?: (selected: Option | Option[]) => void;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  search?: boolean;
  seperate?: boolean;
  select?: boolean;
  shape?: 'checkbox' | 'radio';
  type?: 'check';
  disabled?: boolean;
}

function isGroup(option?: Option): option is Group {
  if (!option) return false;
  return (option as Group).group !== undefined;
}

const DropDown = forwardRef<
  HTMLDivElement,
  DropDownProps & WithStyles<typeof styles>
>((props, ref) => {
  const {
    className,
    classes,
    children,
    options,
    search,
    onChange,
    startIcon,
    endIcon,
    seperate,
    select,
    shape,
    type,
    disabled,
    ...other
  } = props;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(-1);
  const [multi, setMulti] = useState<number[]>([]);
  const [list, setList] = useState(options);

  const handleSearchChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let search = event.target.value;
    search = search.replace(/ /g, '').toLowerCase();
    if (search === '') {
      setList(options);
    }
    if (list) {
      const filter = list.filter((option: Option) => {
        if (typeof option === 'string') {
          return option.toLowerCase().search(search) >= 0;
        }
        if (isGroup(option)) {
          return true;
        }
        return option.text.replace(/ /g, '').toLowerCase().search(search) >= 0;
      });
      setList(filter);
    }
  };

  const handleMultiMenuItemClick = (
    event: MouseEvent<HTMLLIElement>,
    index: number
  ) => {
    setSelected(index);
    const sel = multi.filter((select) => select !== index);
    if (multi.indexOf(index) < 0) {
      sel.push(index);
    }
    sel.sort();
    setMulti(sel);
    if (onChange) {
      const values: Option[] = [];
      sel.map((select) => {
        values.push(list[select]);
        return select;
      });
      if (values.length > 0) {
        if (typeof values[0] === 'string') {
          onChange(values);
        } else {
          onChange(values);
        }
      }
    }
  };

  const handleMenuItemClick = (
    event: MouseEvent<HTMLLIElement>,
    index: number
  ) => {
    setSelected(index);
    if (onChange) {
      const option = list[index];
      if (typeof option === 'string') {
        onChange(option);
      } else if (!isGroup(option)) {
        onChange(option);
      }
    }
    setOpen(false);
  };

  const handleToggle = () => {
    if (disabled) return;
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose: ClickAwayListenerProps['onClickAway'] = (event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const renderLabel = () => {
    if (shape !== 'checkbox' && select && selected >= 0) {
      const option = list[selected];
      if (!option) return undefined;
      if (typeof option === 'string') {
        return option;
      }
      if (isGroup(option)) {
        return undefined;
      }
      return option.text;
    }
    if (shape === 'checkbox' && multi.length > 0) {
      return multi.map((val) => list[val]).join(', ');
    }
    return children;
  };

  const renderSelectedIcon = (sel: boolean) => {
    if (select) {
      if (shape === 'radio') {
        if (sel) {
          return <Adjust fontSize="small" />;
        }
        return <PanoramaFishEye fontSize="small" />;
      }
      if (shape === 'checkbox') {
        if (sel) {
          return <CheckBoxOutlined fontSize="small" />;
        }
        return <CheckBoxOutlineBlankOutlined fontSize="small" />;
      }
    }
    return undefined;
  };

  const renderEndIcon = () => {
    if (endIcon) {
      return endIcon;
    }
    if (!seperate) {
      return open ? <ExpandLess /> : <ExpandMore />;
    }
    return undefined;
  };

  return (
    <div
      className={clsx(className, classes.root, disabled && classes.disabled)}
      ref={ref}
      {...other}
    >
      <ButtonGroup
        variant="outlined"
        fullWidth
        ref={anchorRef}
        aria-label="split button"
      >
        <Button
          onClick={handleToggle}
          endIcon={renderEndIcon()}
          className={clsx(open && 'open')}
        >
          <span>
            {startIcon && startIcon} {renderLabel()}
          </span>
        </Button>
        {seperate && (
          <Button
            className={classes.seperate}
            size="small"
            onClick={handleToggle}
          >
            {open ? <ExpandLess /> : <ExpandMore />}
          </Button>
        )}
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        placement="bottom-start"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  {search && (
                    <OutlinedInput
                      onChange={handleSearchChange}
                      className={classes.search}
                      endAdornment={
                        <InputAdornment position="end">
                          <Search fontSize="small" />
                        </InputAdornment>
                      }
                    />
                  )}
                  <MenuList className={classes.list} id="split-button-menu">
                    {list.map((option, index) => {
                      if (typeof option === 'string') {
                        return (
                          <MenuItem
                            key={option}
                            selected={
                              shape === 'checkbox'
                                ? multi.indexOf(index) >= 0
                                : index === selected
                            }
                            className={clsx(type, shape && 'select')}
                            onClick={(event) =>
                              shape === 'checkbox'
                                ? handleMultiMenuItemClick(event, index)
                                : handleMenuItemClick(event, index)
                            }
                          >
                            {renderSelectedIcon(
                              shape === 'checkbox'
                                ? multi.indexOf(index) >= 0
                                : index === selected
                            )}
                            {option}
                            {index === selected && type === 'check' && (
                              <DoneOutlined />
                            )}
                          </MenuItem>
                        );
                      }
                      if (isGroup(option)) {
                        return (
                          <div key={option.group} className="groupTitle">
                            {option.group}
                          </div>
                        );
                      }
                      return (
                        <MenuItem
                          key={option.value}
                          selected={index === selected}
                          onClick={(event) => handleMenuItemClick(event, index)}
                          className={clsx(
                            option.icon && 'icon-list',
                            type && type
                          )}
                        >
                          {option.icon && option.icon}
                          <div>{option.text}</div>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
});

export default withStyles(styles)(DropDown);
