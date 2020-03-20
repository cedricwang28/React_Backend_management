import Login from "../pages/Login"
import Index from "../pages/admin/dashboard/index"
import List from "../pages/admin/products/List"
import PageNotFound from "../pages/PageNotFound";
import Edit from "../pages/admin/products/Edit";



export const mainRoutes = [{
    path:'/login',
    component:Login
},{
    path:'/404',
    component:PageNotFound
}]

export const adminRoutes = [{
    path:'/admin/dashboard',
    component:Index,
    isShow:true,
    title:"Dashboard"
},{
    path:'/admin/products',
    component:List,
    exact:true,
    isShow:true,
    title:"Products"
},{
    path:'/admin/products/edit/:id',
    component:Edit,
    isShow:false
}]