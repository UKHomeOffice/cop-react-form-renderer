// Local imports
import formatData from './formatData';
import formatDataForComponent from './formatDataForComponent';
import formatDataForForm from './formatDataForForm';
import formatDataForPage from './formatDataForPage';

const Format = {
  component: formatDataForComponent,
  data: formatData,
  form: formatDataForForm,
  page: formatDataForPage
};

export default Format;
