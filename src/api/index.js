import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  // baseUrl:"http://16.171.9.72/"
});

api.interceptors.request.use(
  (req) => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("profile")).authToken
      }`;
    }
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signin = (userInfo) => api.post(`common/login`, userInfo);
export const addMember = (userInfo) =>
  api.post(`api/admin/registerMember`, userInfo);
export const getMember = () => api.get(`api/admin/employees`);
export const getAdminProfile = () => api.get(`api/admin/admin`);
export const getAdminTicket = () => api.get(`api/admin/tickets`);
export const addAssetsCategory = (categoryInfo) =>
  api.post(`api/admin/createAssetCategory`, categoryInfo);
  export const getAssetsCategory = () => api.get(`api/admin/assetCategories`);
  export const getAdminAssets = () => api.get(`api/admin/assets`);
export const getAdminAssetsById = (id) => api.get(`api/admin/assets/${id}`);
export const getAssignAssets = (id) => api.get(`api/admin/assetToEmployee/${id}`);
export const deleteAssetsCategory = (id) =>
  api.delete(`api/admin/deleteAssetCategory/${id}`);
  export const getAdminTicketById = (id) => api.get(`api/admin/tickets/${id}`);
  export const updateMember = ({id,...memberInfo}) => {
    return api.put(`api/admin/updateEmployee/${id}`,memberInfo);
  };
  export const getMemberById = (id) => api.get(`api/admin/employees/${id}`);
  export const updateAdminAssets = ({id,...assetsInfo}) => {
    return api.put(`api/admin/updateAsset/${id}`,assetsInfo);
  };
  export const updateAdminAssetCategory = ({id,...assetsInfo}) => {
    return api.put(`api/admin/updateAssetCategory/${id}`,assetsInfo);
  };
  export const getTotalAsset = () => api.get(`api/admin/totalAsset`);
  export const getTotalCategory = () => api.get(`api/admin/totalCategory`);
  export const getTotalEmployee = () => api.get(`api/admin/totalEmployee`);
  export const getTotalMember = () => api.get(`api/admin/totalMember`);

export const addMyTicket = (ticketInfo) => {
  return api.post(`api/employee/createTicket`, ticketInfo);
};
export const getMyTicket = () => api.get(`api/employee/myTickets`);
export const changePasswordEmployee = (password) =>
api.post(`api/employee/changePassword`, password);
export const getEmployeeProfile = () => api.get(`api/employee/employee`);
export const getEmployeeAssets = () => api.get(`api/employee/myAssets`);
export const getEmployeeTicketById = (id) => api.get(`api/employee/myTickets/${id}`);
export const getDashboardEmployeeAsset = () => api.get(`api/employee/myAssetNumber`);
export const getDashboardEmployeeClose = () => api.get(`api/employee/myClosedTicket`);
export const getDashboardEmployeeOpen = () => api.get(`api/employee/myOpenTicket`);
export const updateEmployeeProfile = (data) => {
  return api.put(`api/employee/update`, data);
};
export const getDashboardEmployeeCategory = () => api.get(`api/employee/totalAssetCategory`);

export const getTechnicianTicket = () => api.get(`api/iTTechnician/myTickets`);
export const updateTicket = ({id,...data}) => {
    return api.put(`api/iTTechnician/updateTicket/${id}`, data);
};
export const getTechnicianEmployee = () => api.get(`api/iTTechnician/employees`);
export const getTicketById = (id) => api.get(`api/iTTechnician/myTickets/${id}`);
export const changePasswordTechnician = (password) =>
  api.post(`api/iTTechnician/changePassword`, password);
  export const getTechnicianProfile = () => api.get(`api/iTTechnician/iTechnician`);
  export const addAssetsTechnician = (assets) =>
  api.post(`api/iTTechnician/assignAsset`, assets);
  export const getAssetsTechnician = () => api.get(`api/iTTechnician/assets`);
  export const getAssetsCategoryTechnician = () => api.get(`api/iTTechnician/assetCategories`);
  export const getDashboardTechnicianTicket = () => api.get(`api/iTTechnician/myTicketNumber`);
export const getDashboardTechnicianClose = () => api.get(`api/iTTechnician/closedTicket`);
export const getDashboardTechnicianOpen = () => api.get(`api/iTTechnician/openTicket`);
export const updateTechnicianProfile = (data) => {
  return api.put(`api/iTTechnician/update`, data);
};


  export const changePasswordStoreKeeper = (password) =>
  api.post(`api/storeKeeper/changePassword`, password);
  export const getStoreKeeperProfile = () => api.get(`api/storeKeeper/storeKeeper`);
  export const addAssetsCategoryStore = (categoryInfo) =>
  api.post(`api/storeKeeper/createAssetCategory`, categoryInfo);
  export const getAssetsCategoryStore = () => api.get(`api/storeKeeper/assetCategories`);
  export const addAssets = (assetsInfo) =>
  api.post(`api/storeKeeper/createAsset`, assetsInfo);
  export const getAssets = () => api.get(`api/storeKeeper/assets`);
  export const updateAssets = ({id,...data}) => {
    return api.put(`api/storeKeeper/updateAsset/${id}`,data);
  };
  export const getAssetsById = (id) => api.get(`api/storeKeeper/assets/${id}`);
  export const updateStoreKeeperProfile = (data) => {
    return api.put(`api/storeKeeper/update`, data);
  };
  export const getStoreTotalAsset = () => api.get(`api/storeKeeper/totalAsset`);
  export const getStoreTotalCategory = () => api.get(`api/storeKeeper/totalCategory`);
  export const getStoreTotalMember = () => api.get(`api/storeKeeper/totalMember`);
  export const updateStoreAssetCategory = ({id,...assetsInfo}) => {
    return api.put(`api/storeKeeper/updateAssetCategory/${id}`,assetsInfo);
  };