import api from './api';
import { forEach } from 'lodash';

const empService = function() {
}

empService.status = function() {
  let url = '/v1/api/connection';
  return new Promise(function(resolve, reject) {
    api.get(url).then(function(res) {
      let { data } = res;
      resolve(data);
    }).catch(function(err) {
      reject(err);
    });
  });
}

empService.getEmployees = function(pageSize, pageIndex) {
  let url = `/v1/api/employee/list?pagesize=${pageSize}&pageindex=${pageIndex}`;
  return new Promise(function(resolve, reject) {
    api.get(url).then(function(res) {
      let { data } = res.data;
      resolve(data);
    }).catch(function(err) {
      reject(err);
    });
  });
}

empService.getEmployeeByKey = function(key) {
  let url = `/v1/api/employee/item?emp_key=${key}`;
  return new Promise(function(resolve, reject) {
    api.get(url).then(function(res) {
      let { data } = res.data;
      if(Array.isArray(data) && data.length) resolve(data[0]);
      else resolve({});
    }).catch(function(err) {
      reject(err);
    });
  });
}

empService.getTeams = function() {
  let url = '/v1/api/employee/teams';
  return new Promise(function(resolve, reject) {
    api.get(url).then(function(res) {
      let { data } = res.data;
      if(Array.isArray(data) && data.length) {
        forEach(data, item => {
          item.value = item.TeamId;
          item.label = item.TeamName;
        });
      }
      resolve(data);
    }).catch(function(err) {
      reject(err);
    });
  });
}

empService.updateEmployee = function(emp_key, emp_name) {
  let url = '/v1/api/employee/item';
  let reqInfo = { emp_key, emp_name };
  return new Promise(function(resolve, reject) {
    api.post(url, reqInfo).then(function(res) {
      let { data } = res.data;
      resolve(data);
    }).catch(function(err) {
      reject(err);
    });
  });
}

empService.assignEmployee = function(emp_key, teamIds) {
  let url = '/v1/api/employee/assign';
  let reqInfo = { emp_key, teamIds };
  return new Promise(function(resolve, reject) {
    api.post(url, reqInfo).then(function(res) {
      let { data } = res.data;
      resolve(data);
    }).catch(function(err) {
      reject(err);
    });
  });
}

export default empService;