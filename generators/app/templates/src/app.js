import config from 'dotenv';
import express from 'express';
config.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to this node API.',
}));

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

export default app;
