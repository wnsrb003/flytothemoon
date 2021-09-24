const mongoose = require('mongoose');

const uri = "mongodb+srv://admin:admin@cluster0.dc3ag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connect = () => {
  if (process.env.NODE_ENV !== 'production'){
    mongoose.set('debug', true);
  }
  mongoose.connect(uri, {
    dbName: 'moon',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (error) => {
    if (error) {
      console.log('몽고디비 연결 에러', error);
    } else {
      console.log('몽고디비 연결 성공');
    }
  });
};
mongoose.connection.on('error', (error) => {
  console.error('몽고디비 연결 에러', error);
});
mongoose.connection.on('disconnected', () => {
  console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.');
  connect();
});

module.exports = connect;
