// i was going to comment on each line but i think it's pretty self explanatory
const express = require('express');
const routes = require('./routes');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
    }
);

