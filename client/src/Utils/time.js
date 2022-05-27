import moment from 'moment';
import 'moment/locale/ko';

export const changeFormat = (time, format) => {
  return moment(time).format(format);
}

export const fromNow = (time) => {
  return moment(time).fromNow();
}
