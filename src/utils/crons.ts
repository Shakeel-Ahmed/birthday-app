import cron from "node-cron";
import Users, {UsersInterface} from "../models/Users";
import { sequelize } from "../database";

const dispatch = (email: string, firstName: string, lastName: string) => {
    const body = {
        email: email,
        message:`Hi ${firstName + ' ' + lastName}, ** Happy Birth Day ** Many happy returns of the day.`
    }
    return {
        headers: { "Content-Type": "application/json" },
        method: "POST",
            body: JSON.stringify(body)
    }
}

console.log(process.env.TIME_ZONE);
console.log(process.env.DB_HOST);

const sendEmailCron = ()=> {
    const sendEmail = (emailQry :string) => {
        sequelize.query(emailQry).then((results)=> {
            const [users] = results;
            users.map((user: UsersInterface )=>{
                console.log(process.env.EMAIL_API_ENDPOINT);
                const payload = dispatch(user.email, user.firstName, user.lastName);
                fetch(apiURL,payload)
                    .then(response => response.json())
                    .then(data => {
                        Users.findByPk(user.id)
                            .then((user:any) => {
                                if(data.status === 'sent'){
                                    user.status = 'sent';
                                }   else {
                                    user.status = 'fail';
                                    console.log('undelivered');
                                }
                                user.save();
                            })
                            .catch(error => console.log(error));
                    })
                    .catch(error => {
                        console.error("ERROR: ",error)
                    })
            });
        }).catch(error=>{
            console.error(error);
        });
    }
    const currentDate = new Date();
    const newDate = new Date(currentDate.getTime() + 15 * 60000);

    const currentMonth = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const currentDay = currentDate.getDate();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    const newHour = newDate.getHours();
    const newMinute = newDate.getMinutes();

    const apiURL = 'https://email-service.digitalenvision.com.au/send-email';
    const query =  `SELECT * FROM users
                    WHERE MONTH(birthday) = ${ currentMonth }
                    AND DAY(birthday) = ${ currentDay }
                    AND TIME(birthday) >= '${currentHour + ':' + currentMinute}'
                    AND TIME(birthday) <  '${newHour + ':' + newMinute}'
                    AND status = 'waiting'`;

    const queryFail = `SELECT * FROM users
                    WHERE MONTH(birthday) = ${ currentMonth }
                    AND TIME(birthday) >= '${currentHour + ':' + currentMinute}'
                    AND TIME(birthday) <  '${newHour + ':' + newMinute}'
                    AND status = 'fail'`;

    // sending birthday greetings email
    sendEmail(query);

    // re-attempting to send the email
    // for failed earlier attempts
    sendEmail(queryFail);
}

const RunCrons = cron.schedule('*/30 * * * *',sendEmailCron);

export default RunCrons;