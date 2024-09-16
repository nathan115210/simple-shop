import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import errorHandler from './controllers/error';
import adminRoute from './routes/admin';
import shopRoutes from './routes/shop';
import rootDir from './util/path';

const app = express();
let port = 3000;

// set global settings
// app.engine(
//   'hbs',
//   engine({
//     layoutsDir: 'src/views/layouts/',
//     defaultLayout: 'main-layout',
//     extname: 'hbs',
//   }),
// );
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
// excuse all the files in the public folder
app.use(express.static(path.join(rootDir, '../src/public')));

//Admin route => /admin/add-product
app.use('/admin', adminRoute);

app.use(shopRoutes);

//404 page
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
