const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// CORS with PATCH allowed
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};
app.use(cors(corsOptions));

app.use(cookieParser());

// Multer-enabled routes (multipart/form-data) BEFORE body parsers
const AddNewUserRouter = require('./api/users/addnewuser.js'); // Multer route
app.use('/api/users', AddNewUserRouter);

// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Body parsers for JSON & URL-encoded AFTER multer routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- User routes ---
const DeleteUser = require('./api/users/deleteuser.js');
const GetUser = require('./api/users/getalluser.js');
const SelectOneUser = require('./api/users/selectoneuser.js');
const SignUpRoute = require('./api/users/signup.js'); // SignUp route
const SignInRoute = require('./api/users/signin.js'); // SignIn route
const ResetPassword = require('./api/users/resetpassword.js'); // Reset Password route
// const SignInRoute = require('./api/users/signin.js');

// Subscritption Route 
const ViewSubscription = require('./api/subscription/viewsubscription.js');
app.use('/subscription', ViewSubscription);


const EditSubscription = require('./api/subscription/editsubscription.js');
app.use('/subscription/update', EditSubscription);

const AddSubscription = require('./api/subscription/addsubscription.js');
app.use('/subscription', AddSubscription);



const updateUserInfo = require('./api/users/updateuserinfo.js');

app.use('/user/delete', DeleteUser);
app.use('/user/update', updateUserInfo);
app.use('/user', SelectOneUser);
app.use('/user', GetUser);
app.use('/user/signup', SignUpRoute);
app.use('/user/signin', SignInRoute); // Reusing SignUp route for sign-in
// app.use('/user', SignInRoute);

// --- Ads routes ---
const AddNewAds = require('./api/ads/addnewads.js');
const GetAds = require('./api/ads/getads.js');
const SearchAd = require('./api/ads/searchads.js');

app.use('/ads/new', AddNewAds);
app.use('/ads/search', SearchAd);
app.use('/ads', GetAds);


// --- Devices routes ---
const GetDevices = require('./api/devices/getdevices.js');
app.use('/devices', GetDevices);

// --- Market routes ---
const GetMarket = require('./api/market/getmarkets.js');
app.use('/markets', GetMarket);


const AddMarket = require('./api/market/addnewmarket.js');
app.use('/markets/add', AddMarket);


const EditMarket = require('./api/market/editmarket.js');
app.use('/markets/edit', EditMarket);

// --- Schedule routes ---
const GetSchedule = require('./api/schedules/getSchedule.js');
app.use('/schedules', GetSchedule);

// --- Audit routes ---
const GetAudit = require('./api/audit/getaudit.js');
app.use('/audit', GetAudit);

// --- Health check ---
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

// --- Error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!res.headersSent) {
    res.status(500).json({ error: 'Something broke!' });
  }
});

module.exports = app;
