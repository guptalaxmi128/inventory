import { combineReducers } from 'redux';
import auth from './auth/auth';
import addMember from './addMember/addMember';
import myTicket from './employee/myTicket/myTicket';
import technicianTicket from './itTechnician/myTicket/myTicket';
import changePasswordTechnician from './itTechnician/changePassword/changePassword';
import technicianProfile from './itTechnician/profile/profile';
import changePasswordEmployee from './employee/changePassword/changePassword';
import employeeProfile from './employee/profile/profile';
import changePasswordStoreKeeper from './storeKeeper/changePassword/changePassword';
import storeKeeperProfile from './storeKeeper/profile/profile';
import adminProfile from './admin/profile/profile';
import adminTicket from './admin/ticket/ticket';
import assetsCategory from './admin/assetsCategory/assetsCategory';
import assetsCategoryStore from './storeKeeper/assetsCategory/assetsCategory';
import technicianEmployee from './itTechnician/employee/employee';
import assetsTechnician from './itTechnician/assets/assets';
import assets from './admin/assets/assets';
import assetsStore from './storeKeeper/assets/assets';
import technicianCategory from './itTechnician/assetsCategory/assetsCategory';
import employeeDashboard from './employee/dashboard/dashboard';
import technicianDashboard from './itTechnician/dashboard/dashboard';
import adminDashboard from './admin/dashboard/dashboard';
import storeKeeperDashboard from './storeKeeper/dashboard/dashboard';
import employeeAssets from './employee/assets/assets';

export const reducers = combineReducers({
auth,
addMember,
myTicket,
technicianTicket,
changePasswordTechnician,
technicianProfile,
changePasswordEmployee,
employeeProfile,
changePasswordStoreKeeper,
storeKeeperProfile,
adminProfile,
adminTicket,
assetsCategory,
assetsCategoryStore,
technicianEmployee,
assetsTechnician,
assets,
assetsStore,
technicianCategory,
employeeDashboard,
technicianDashboard,
adminDashboard,
storeKeeperDashboard,
employeeAssets

});
