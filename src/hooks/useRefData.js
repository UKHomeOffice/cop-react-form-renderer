// Global imports
import { Utils as HOUtils } from '@ukhomeoffice/cop-react-components';
import { useEffect, useState } from 'react';

// Local imports
import Data from '../utils/Data';
import useGetRequest, { STATUS_ERROR, STATUS_FETCHED } from './useGetRequest';

export const STATUS_LOADING = 'loading';
export const STATUS_COMPLETE = 'complete';

const getRefDataUrl = (component) => {
  const data = component.data;
  if (data && !data.options) {
    return HOUtils.interpolateString(data.url, component.formData);
  }
  return undefined;
};

const useRefData = (component) => {
  const url = getRefDataUrl(component);
  const { status: _status, data: _data } = useGetRequest(url);
  const [ data, setData ] = useState([]);
  const [ status, setStatus ] = useState(STATUS_LOADING);
  useEffect(() => {
    if (!url) {
      if (component.data && component.data.options) {
        setData(Data.refData.toOptions(component.data.options, component.item));
      }
      setStatus(STATUS_COMPLETE);
    } else if (_status === STATUS_FETCHED) {
      if (_data) {
        setData(Data.refData.toOptions(_data.data, component.item));
      }
      setStatus(STATUS_COMPLETE);
    } else if (_status === STATUS_ERROR) {
      setData([]);
      setStatus(STATUS_COMPLETE);
    }
  }, [component, _status, _data, url, setData, setStatus]);

  return { data, status };
};

export default useRefData;
