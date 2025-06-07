import { BrowserRouter as Router, Routes, Route } from "react-router";
import { UserProvider } from "./components/context/UserContext/UserContext";

import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import ForgotPassword from "./pages/AuthPages/ResetPassword";

import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserPages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import Usermanagement from "./pages/UserPages/Usermanagement";
import VideoManagment from "./pages/VideoManagment";
import Adsmanagment from "./pages/AdsManagment";
import CustomerSupport from "./pages/CustomeSupport";


import MarketManagment from "./pages/MarketManagment";
import EditMarket from "./pages/marketpages/EditMarket";


import ScreenManagment from "./pages/ScreenManagment";
import Setting from "./pages/Setting";
import Subscriptionmanagment from "./pages/SubscribitionPages/Subscriptionmanagment";
import CommericalManagment from "./pages/CommericalManagment";
import MarketInfo from "./pages/MarketInfo";
import SubscriberInfo from "./pages/SubscribitionPages/SubscriberInfo";
import ScreenInfo from "./pages/ScreenInfo";
import AdInfo from "./pages/Adinfo";
import ComInfo from "./pages/Commericalinfo";
import TicketInfo from "./pages/TicketInfo";
import UserInfo from "./pages/UserPages/UserInfo";
import UserEdit from "./pages/UserPages/UserEdit";
import SubscriberEdit from "./pages/SubscribitionPages/SubscriberEdit";
import AddMarket from "./pages/marketpages/AddMarket";



export default function App() {
  return (
    <UserProvider>
      <>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Dashboard Layout */}
            <Route element={<AppLayout />}>
              <Route index path="/" element={<Home />} />

              {/* Others Page */}
              <Route path="/profile" element={<UserProfiles />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/blank" element={<Blank />} />
              <Route path="/usermanagement" element={<Usermanagement />} />

              <Route
                path="/usermanagement/userdetail"
                element={<UserInfo header="" />}
              />

              <Route path="/usermanagement/edit/:id" element={<UserEdit />} />

              <Route
                path="Subscription/subscriberinfo"
                element={
                  <SubscriberInfo
                  />
                }
              />
              <Route
                path="/Subscription/edit/:id"
                element={<SubscriberEdit />}
              />

              <Route
                path="MarketManagment/marketinfo"
                element={
                  <MarketInfo
                    header="Welcome to the Market Page"
                    title="Manage your market details"
                    count={202}
                    isActive={true}
                  />
                }
              />
              <Route 
                path="/MarketManagment/AddMarket"
                element={<AddMarket />}
              />

                            <Route
                path="/Markets/edit/:id"
                element={<EditMarket />}
              />

              <Route
                path="ScreenManagment/screeninfo"
                element={
                  <ScreenInfo
                    header="Welcome to the Screen Page"
                    title="Manage your market details"
                    count={202}
                    isActive={true}
                  />
                }
              />

              <Route
                path="adsmanagment/adinfo"
                element={
                  <AdInfo
                    header="Welcome to the Screen Page"
                    title="Manage your market details"
                    count={202}
                    isActive={true}
                  />
                }
              />

              <Route
                path="commericalmanagment/commericalinfo"
                element={
                  <ComInfo
                    header="Welcome to the Screen Page"
                    title="Manage your market details"
                    count={202}
                    isActive={true}
                  />
                }
              />

              <Route
                path="CustomerSupport/ticketinfo"
                element={
                  <TicketInfo
                    header="Welcome to the Customer Support Page"
                    title="Manage your market details"
                    count={202}
                    isActive={true}
                  />
                }
              />

              <Route path="/videomanagment" element={<VideoManagment />} />
              <Route path="/adsmanagment" element={<Adsmanagment />} />
              <Route
                path="/CommericalManagment"
                element={<CommericalManagment />}
              />
              <Route path="/CustomerSupport" element={<CustomerSupport />} />
              <Route path="/MarketManagment" element={<MarketManagment />} />
              <Route path="/ScreenManagment" element={<ScreenManagment />} />
              <Route path="/Setting" element={<Setting />} />
              <Route path="/Subscription" element={<Subscriptionmanagment />} />

              {/* Forms */}
              <Route path="/form-elements" element={<FormElements />} />

              {/* Tables */}
              <Route path="/basic-tables" element={<BasicTables />} />

              {/* Ui Elements */}
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/badge" element={<Badges />} />
              <Route path="/buttons" element={<Buttons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/videos" element={<Videos />} />

              {/* Charts */}
              <Route path="/line-chart" element={<LineChart />} />
              <Route path="/bar-chart" element={<BarChart />} />
            </Route>

            {/* Auth Layout */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/resetpassword" element={<ForgotPassword />} />

            {/* Fallback Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </>
    </UserProvider>
  );
}
