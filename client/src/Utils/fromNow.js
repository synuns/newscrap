import moment from 'moment';
import 'moment/locale/ko';

const fromNow = (time) => {
  return moment(time).fromNow();
}

export default fromNow;
