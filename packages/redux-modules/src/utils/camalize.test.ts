import camalize from './camalize';

describe('camalize', () => {
  it('should camalize uppercase action type', () => {
    expect(camalize('COMPONENTS/FETCH_GET_USER')).toEqual(
      'components/fetchGetUser'
    );
  });

  it('should not change action type', () => {
    expect(camalize('components/fetchGetUser')).toEqual(
      'components/fetchGetUser'
    );
  });
});
