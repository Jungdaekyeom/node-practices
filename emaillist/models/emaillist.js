// mysql2 임포트
const mysql = require('mysql2');
const dbconn = require('./dbconn');
const util = require('util');

module.exports = {
    // async : 리턴에 await가 있기 때문에 async를 씀
    findAll: async function (callback) {
        const conn = dbconn();

        // 1번 : 이해할 필요가 있다.
        // const query = function(sql, data) {
        //     return new Promise(function(resolve, reject){
        //         conn.query(sql, [], function(error, results, field){
        //             return error ? reject(error) : resolve(results);
        //         })
        //     })
        // }

        // 2번 : 위와 같다. 너무 과하게 짠거지 ㅋ
        // 대신 이렇게 쭉~ 읽어갈 수 있는 것이 함수형의 장점이다.
        // const query = (sql, data) => new Promise((resolve, reject) => conn.query(sql, [], (error, results, field) => (error ? reject(error) : resolve(results))))

        // 3번 : util 사용한 축약ver
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query('select no, first_name as firstName, last_name as lastName, email from emaillist order by no desc', []);
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },
    
    insert: async function(emaillist){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query('insert into emaillist(first_name, last_name, email) values (?, ?, ?)', 
            Object.values(emaillist) // 배열
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    }
}
