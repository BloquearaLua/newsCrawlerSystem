const e = require('express');
const mysql = require('mysql');
const {mysqlOptions} = require('../config/config.default')

function findOne(params) {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions);
            const { username="", email="", id="" } = params;
            const sql = `select * from users where (username = '${username}' or email = '${email}') and id != '${id}'`;
            conn.connect((err) => {
                if(err) {
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            // console.log("dao:",result);
                            if(result.length === 0){
                                // reject(username ? "用户名已存在":"邮箱已存在");
                                resolve(undefined)
                            }else{
                                resolve(result[0]);
                            }
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function getUserById(id) {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `select id,username,email,gender,description from users where id=${id}`;
            conn.connect((err) => {
                if(err) {
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

function insertUser(params) {
    return new Promise((resolve,reject) => {
        try{
            const { username, password, email, description="", avatar="", gender=0, role_id=2 } = params;
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `insert into users(username,password,email,description,avatar,gender,role_id) values (?,?,?,?,?,?,?)`;
            console.log("params..",params.role_id);
            const insert_params = [username,password,email,description,avatar,gender,role_id]
            // console.log(params.role_id);
            conn.connect((err) => {
                if(err){
                    reject(err);
                }else{
                    conn.query(sql,insert_params,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })
                }
            })
        }catch(error){
            reject(error);
        }
    });
}

function updateUser(params) {
    return new Promise((resolve,reject) => {
        try{
            const conn = mysql.createConnection(mysqlOptions);
            const {id,username,email,description='',gender=0} = params;
            const sql = `update users set username='${username}',email='${email}',description='${description}',gender='${gender}' where id=${id}`;  
            conn.connect((err) => {
                if(err){
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })
                }
            })
        }catch(error){
            reject(error);
        }
    })
}

function deleteUser(params) {
    return new Promise((resolve,reject) => {
        try {
            const conn = mysql.createConnection(mysqlOptions);
            const sql = `delete from \`users\` where id=${params.id}`;
            conn.connect((err) => {
                if(err) {
                    reject(err);
                }else{
                    conn.query(sql,(err,result,fields) => {
                        if(err){
                            reject(err);
                        }else{
                            resolve(result);
                        }
                    })
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    findOne,
    getUserById,
    insertUser,
    updateUser,
    deleteUser
}