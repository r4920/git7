/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Blog = require('../model/Blog');
let User = require('../model/user');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteBlog = async (filter) =>{
  try {
    return await Blog.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter3726 = { 'updatedBy': { '$in': user } };
      const Blog1910 = await deleteBlog(BlogFilter3726);
      const BlogFilter6877 = { 'addedBy': { '$in': user } };
      const Blog0389 = await deleteBlog(BlogFilter6877);
      const userFilter0592 = { 'addedBy': { '$in': user } };
      const user3062 = await deleteUser(userFilter0592);
      const userFilter0618 = { 'updatedBy': { '$in': user } };
      const user5817 = await deleteUser(userFilter0618);
      const userTokensFilter4372 = { 'userId': { '$in': user } };
      const userTokens7944 = await deleteUserTokens(userTokensFilter4372);
      const userTokensFilter3284 = { 'addedBy': { '$in': user } };
      const userTokens6280 = await deleteUserTokens(userTokensFilter3284);
      const userTokensFilter3270 = { 'updatedBy': { '$in': user } };
      const userTokens4449 = await deleteUserTokens(userTokensFilter3270);
      const roleFilter2944 = { 'addedBy': { '$in': user } };
      const role2749 = await deleteRole(roleFilter2944);
      const roleFilter7720 = { 'updatedBy': { '$in': user } };
      const role6985 = await deleteRole(roleFilter7720);
      const projectRouteFilter7331 = { 'addedBy': { '$in': user } };
      const projectRoute5444 = await deleteProjectRoute(projectRouteFilter7331);
      const projectRouteFilter3375 = { 'updatedBy': { '$in': user } };
      const projectRoute0180 = await deleteProjectRoute(projectRouteFilter3375);
      const routeRoleFilter7537 = { 'addedBy': { '$in': user } };
      const routeRole6438 = await deleteRouteRole(routeRoleFilter7537);
      const routeRoleFilter8492 = { 'updatedBy': { '$in': user } };
      const routeRole3979 = await deleteRouteRole(routeRoleFilter8492);
      const userRoleFilter8842 = { 'userId': { '$in': user } };
      const userRole6353 = await deleteUserRole(userRoleFilter8842);
      const userRoleFilter2013 = { 'addedBy': { '$in': user } };
      const userRole5476 = await deleteUserRole(userRoleFilter2013);
      const userRoleFilter7925 = { 'updatedBy': { '$in': user } };
      const userRole9755 = await deleteUserRole(userRoleFilter7925);
      return await User.deleteMany(filter);
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    return await UserTokens.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter3975 = { 'roleId': { '$in': role } };
      const routeRole7510 = await deleteRouteRole(routeRoleFilter3975);
      const userRoleFilter5495 = { 'roleId': { '$in': role } };
      const userRole0434 = await deleteUserRole(userRoleFilter5495);
      return await Role.deleteMany(filter);
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter0492 = { 'routeId': { '$in': projectroute } };
      const routeRole5283 = await deleteRouteRole(routeRoleFilter0492);
      return await ProjectRoute.deleteMany(filter);
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    return await RouteRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    return await UserRole.deleteMany(filter);
  } catch (error){
    throw new Error(error.message);
  }
};

const countBlog = async (filter) =>{
  try {
        
    const BlogCnt =  await Blog.countDocuments(filter);
    return { Blog : BlogCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
        
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);

      const BlogFilter = { '$or': [{                    updatedBy : { '$in' : user } },{                    addedBy : { '$in' : user } }] };
      const BlogCnt =  await dbService.countDocument(Blog,BlogFilter);

      const userFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userCnt =  await dbService.countDocument(User,userFilter);

      const userTokensFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userTokensCnt =  await dbService.countDocument(UserTokens,userTokensFilter);

      const roleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const roleCnt =  await dbService.countDocument(Role,roleFilter);

      const projectRouteFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const projectRouteCnt =  await dbService.countDocument(ProjectRoute,projectRouteFilter);

      const routeRoleFilter = { '$or': [{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    userId : { '$in' : user } },{                    addedBy : { '$in' : user } },{                    updatedBy : { '$in' : user } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        Blog : BlogCnt,
        user : userCnt,
        userTokens : userTokensCnt,
        role : roleCnt,
        projectRoute : projectRouteCnt,
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
        
    const userTokensCnt =  await UserTokens.countDocuments(filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
        
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      const userRoleFilter = { '$or': [{                    roleId : { '$in' : role } }] };
      const userRoleCnt =  await dbService.countDocument(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
        
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);

      const routeRoleFilter = { '$or': [{                    routeId : { '$in' : projectroute } }] };
      const routeRoleCnt =  await dbService.countDocument(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
        
    const routeRoleCnt =  await RouteRole.countDocuments(filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
        
    const userRoleCnt =  await UserRole.countDocuments(filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteBlog = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await Blog.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let user = await User.find(filter, { _id:1 });
    if (user.length){
      user = user.map((obj) => obj._id);
      const BlogFilter3166 = { 'updatedBy': { '$in': user } };
      const Blog4173 = await softDeleteBlog(BlogFilter3166, updateBody);
      const BlogFilter9606 = { 'addedBy': { '$in': user } };
      const Blog8830 = await softDeleteBlog(BlogFilter9606, updateBody);
      const userFilter7758 = { 'addedBy': { '$in': user } };
      const user3835 = await softDeleteUser(userFilter7758, updateBody);
      const userFilter6432 = { 'updatedBy': { '$in': user } };
      const user9838 = await softDeleteUser(userFilter6432, updateBody);
      const userTokensFilter1995 = { 'userId': { '$in': user } };
      const userTokens3475 = await softDeleteUserTokens(userTokensFilter1995, updateBody);
      const userTokensFilter6313 = { 'addedBy': { '$in': user } };
      const userTokens1989 = await softDeleteUserTokens(userTokensFilter6313, updateBody);
      const userTokensFilter8888 = { 'updatedBy': { '$in': user } };
      const userTokens5027 = await softDeleteUserTokens(userTokensFilter8888, updateBody);
      const roleFilter7558 = { 'addedBy': { '$in': user } };
      const role9898 = await softDeleteRole(roleFilter7558, updateBody);
      const roleFilter3862 = { 'updatedBy': { '$in': user } };
      const role8526 = await softDeleteRole(roleFilter3862, updateBody);
      const projectRouteFilter7314 = { 'addedBy': { '$in': user } };
      const projectRoute7311 = await softDeleteProjectRoute(projectRouteFilter7314, updateBody);
      const projectRouteFilter5153 = { 'updatedBy': { '$in': user } };
      const projectRoute1314 = await softDeleteProjectRoute(projectRouteFilter5153, updateBody);
      const routeRoleFilter1157 = { 'addedBy': { '$in': user } };
      const routeRole6168 = await softDeleteRouteRole(routeRoleFilter1157, updateBody);
      const routeRoleFilter9587 = { 'updatedBy': { '$in': user } };
      const routeRole9612 = await softDeleteRouteRole(routeRoleFilter9587, updateBody);
      const userRoleFilter7587 = { 'userId': { '$in': user } };
      const userRole1994 = await softDeleteUserRole(userRoleFilter7587, updateBody);
      const userRoleFilter3358 = { 'addedBy': { '$in': user } };
      const userRole5798 = await softDeleteUserRole(userRoleFilter3358, updateBody);
      const userRoleFilter4269 = { 'updatedBy': { '$in': user } };
      const userRole7224 = await softDeleteUserRole(userRoleFilter4269, updateBody);
      return await User.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No user found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserTokens.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let role = await Role.find(filter, { _id:1 });
    if (role.length){
      role = role.map((obj) => obj._id);
      const routeRoleFilter2288 = { 'roleId': { '$in': role } };
      const routeRole2545 = await softDeleteRouteRole(routeRoleFilter2288, updateBody);
      const userRoleFilter8993 = { 'roleId': { '$in': role } };
      const userRole2365 = await softDeleteUserRole(userRoleFilter8993, updateBody);
      return await Role.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No role found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody, defaultValues = {}) =>{
  try {
    let projectroute = await ProjectRoute.find(filter, { _id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj._id);
      const routeRoleFilter8957 = { 'routeId': { '$in': projectroute } };
      const routeRole5043 = await softDeleteRouteRole(routeRoleFilter8957, updateBody);
      return await ProjectRoute.updateMany(filter, {
        ...defaultValues,
        ...updateBody
      });
    } else {
      return 'No projectRoute found.';
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await RouteRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody, defaultValues = {}) =>{
  try {
    return await UserRole.updateMany(filter, {
      ...defaultValues,
      ...updateBody
    });
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteBlog,
  deleteUser,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countBlog,
  countUser,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteBlog,
  softDeleteUser,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
