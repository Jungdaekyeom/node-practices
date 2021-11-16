// mysql2 임포트
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
            return await query("select no, name, date_format(reg_date, '%Y/%m/%d %H:%i:%s') as reg_date, message from guestbook order by reg_date desc", []);
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },
    
    insert: async function(guestbook){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query('insert into guestbook(no, name, password, message, reg_date) values (null, ?, ?, ?, now())', 
            Object.values(guestbook) // 배열로 순서대로 집어넣음
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },
        
    delete: async function(guestbook){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);

        try {
            return await query("delete from guestbook where no=? and password=?", 
            Object.values(guestbook)
            );
        } catch(e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },

}
