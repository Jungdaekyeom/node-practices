// mysql2 임포트
const mysql = require('mysql2');
const util = require('util');

module.exports = {
    // async 리턴의 await와 쌍으로 움직임
    findAll: async function (callback) {
        const conn = mysql.createConnection({
            host: '127.0.0.1',
            port: 3307,
            user: 'webdb',
            password: 'webdb',
            database: 'webdb'
        });

        // 1번 : 이해할 필요가 있다.
        // const query = function(sql, data){
        //     return new Promise(function(resolve, reject){
        //         conn.query(sql, [], function(error, results, field){
        //             return error ? reject(error) : resolve(results);
        //         })
        //     });`
        // }

        // 2번 : 위와 같다. 너무 과하게 짠거지 ㅋ
        // 대신 이렇게 쭉~ 읽어갈 수 있는 것이 함수형의 장점이다.
        // const query = (sql, data) => new Promise((resolve, reject) => conn.query(sql, [], (error, results, field) => (error ? reject(error) : resolve(results))))

        // 3번 : util 사용한 축약ver
        // 사람들이 보기에는 
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query('select no, first_name as firstName, last_name as lastName, email from emaillist order by no desc', []);
        } catch (e) {
            console.error(e);
        } finally {
            conn.end();
        }

    }
}