import { createAction } from '@reduxjs/toolkit';
import {
  egApiTake,
  egApiRequest,
  egApiCancel,
  egApiSuccess,
  egApiFailure,
  clearApiResponse,
  clearApisResponse,
  destroyApi,
} from './actions';
import { apis as reducer } from './apis';

const leafs = ['components', 'list', 'fetchGetMember'];

describe('apis module reducers', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '', payload: {} })).toEqual({});
  });

  it('should handle EG_API_TAKE', () => {
    const initialState = {};
    const expectedState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
          },
        },
      },
    };
    expect(reducer(initialState, egApiTake({ leafs }))).toEqual(expectedState);
  });

  it('should handle EG_API_REQUEST', () => {
    const initialState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
          },
        },
      },
    };
    const expectedState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: true,
          },
        },
      },
    };
    expect(reducer(initialState, egApiRequest({ leafs }))).toEqual(
      expectedState
    );
  });

  it('should handle EG_API_CANCEL', () => {
    const initialState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: true,
          },
        },
      },
    };
    const expectedState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: false,
          },
        },
      },
    };
    expect(reducer(initialState, egApiCancel({ leafs }))).toEqual(
      expectedState
    );
  });

  it('should handle EG_API_SUCCESS with response', () => {
    const initialState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: true,
          },
        },
      },
    };
    const response = {
      data: 'data',
    };
    const expectedState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: false,
            response,
          },
        },
      },
    };
    expect(
      reducer(
        initialState,
        egApiSuccess({
          leafs,
          response,
        })
      )
    ).toEqual(expectedState);
  });

  it('should handle EG_API_SUCCESS without response', () => {
    const initialState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: true,
          },
        },
      },
    };
    const expectedState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: false,
          },
        },
      },
    };
    expect(
      reducer(
        initialState,
        egApiSuccess({
          leafs,
        })
      )
    ).toEqual(expectedState);
  });

  it('should handle EG_API_FAILURE with error object', () => {
    const initialState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: true,
          },
        },
      },
    };
    const error = new Error();
    const expectedState = {
      components: {
        list: {
          fetchGetMember: {
            isLoading: false,
            isError: true,
            error,
          },
        },
      },
    };
    expect(
      reducer(
        initialState,
        egApiFailure({
          leafs,
          error,
        })
      )
    ).toEqual(expectedState);
  });

  it('should handle EG_API_FAILURE without error object', () => {
    const initialState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: true,
          },
        },
      },
    };
    const expectedState = {
      components: {
        list: {
          fetchGetMember: {
            isLoading: false,
            isError: true,
          },
        },
      },
    };
    expect(
      reducer(
        initialState,
        egApiFailure({
          leafs,
        })
      )
    ).toEqual(expectedState);
  });

  it('should handle EG_CLEAR_API_RESPONSE with single action', () => {
    const fetchGetMember = createAction('COMPONENTS/LIST/FETCH_GET_MEMBER');
    const initialState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: false,
            response: {
              data: 'data',
            },
          },
        },
        user: {
          fetchGetUser: {
            isError: false,
            isLoading: false,
            response: {
              data: 'data',
            },
          },
        },
      },
    };
    const expectedState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: false,
          },
        },
        user: {
          fetchGetUser: {
            isError: false,
            isLoading: false,
            response: {
              data: 'data',
            },
          },
        },
      },
    };
    expect(reducer(initialState, clearApiResponse(fetchGetMember()))).toEqual(
      expectedState
    );
  });

  it('should handle EG_CLEAR_API_RESPONSE without any change', () => {
    const initialState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: false,
            response: {
              data: 'data',
            },
          },
        },
      },
    };
    expect(reducer(initialState, clearApiResponse())).toEqual(initialState);
  });

  it('should handle EG_CLEAR_APIS_RESPONSE with multiple actions', () => {
    const fetchGetMember = createAction('COMPONENTS/LIST/FETCH_GET_MEMBER');
    const fetchGetUser = createAction('COMPONENTS/USERS/FETCH_GET_USER');
    const initialState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: false,
            response: {
              data: 'data',
            },
          },
        },
        users: {
          fetchGetUser: {
            isError: false,
            isLoading: false,
            response: {
              data: 'data',
            },
          },
        },
      },
    };
    const expectedState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: false,
          },
        },
        users: {
          fetchGetUser: {
            isError: false,
            isLoading: false,
          },
        },
      },
    };
    expect(
      reducer(
        initialState,
        clearApisResponse([fetchGetMember(), fetchGetUser()])
      )
    ).toEqual(expectedState);
  });

  it('should handle EG_CLEAR_APIS_RESPONSE without any change', () => {
    const initialState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: false,
            response: {
              data: 'data',
            },
          },
        },
      },
    };
    expect(reducer(initialState, clearApisResponse())).toEqual(initialState);
  });

  it('should handle EG_DESTROY_API', () => {
    const initialState = {
      components: {
        list: {
          fetchGetMember: {
            isError: false,
            isLoading: false,
            response: {
              data: 'data',
            },
          },
        },
      },
    };
    expect(reducer(initialState, destroyApi())).toEqual(initialState);
    expect(reducer(initialState, destroyApi(['components', 'test']))).toEqual(
      initialState
    );
    expect(reducer(initialState, destroyApi(['components', 'list']))).toEqual({
      components: {
        list: {},
      },
    });
  });
});
