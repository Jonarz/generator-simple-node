import config from 'dotenv';
config.config();
import express from 'express';
import authUtils from './utils/AuthUtils';
/* ROUTES IMPORT */
import userRouter from './routes/UserRoutes';
import authRoutes from './routes/AuthRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;
/*
* IF YOU WANT TO PROTECT A ROUTE 
* USE authUtils.validateJwtToken AS middleware
*
* EXAMPLE: app.use('/api/v1/users', authUtils.validateJwtToken , userRouter);
*/
app.use('/api/v1/users', userRouter);
app.use('/api/v1/authorization' ,authRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this node API.',
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
