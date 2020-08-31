import { ResponseContent } from './SurveyCharts';

const sortResponseContentCount = (a: ResponseContent, b: ResponseContent) => {
  if (a.responseContentCount > b.responseContentCount) return -1;
  return 0;
};

export default sortResponseContentCount;
