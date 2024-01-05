import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
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
export const getAdminAssetsById = (id) => api.get(`api/admin/assetToEmployee/${id}`);
export const deleteAssetsCategory = (id) =>
  api.delete(`api/admin/deleteAssetCategory/${id}`);


export const addMyTicket = (ticketInfo) => {
  return api.post(`api/employee/createTicket`, ticketInfo);
};
export const getMyTicket = () => api.get(`api/employee/myTickets`);
export const changePasswordEmployee = (password) =>
api.post(`api/employee/changePassword`, password);
export const getEmployeeProfile = () => api.get(`api/employee/employee`);


export const getTechnicianTicket = () => api.get(`api/iTTechnician/myTickets`);
export const updateTicket = (formData) => {
    const id = formData.get('id');
    return api.put(`api/iTTechnician/updateTicket/${id}`, formData);
};
export const getTechnicianEmployee = () => api.get(`api/iTTechnician/employees`);
export const getTicketById = (id) => api.get(`api/iTTechnician/myTickets/${id}`);
export const changePasswordTechnician = (password) =>
  api.post(`api/iTTechnician/changePassword`, password);
  export const getTechnicianProfile = () => api.get(`api/iTTechnician/iTechnician`);
  export const addAssetsTechnician = (assets) =>
  api.post(`api/iTTechnician/assignAsset`, assets);
  export const getAssetsTechnician = () => api.get(`api/iTTechnician/assets`);



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
