import { Request, Response } from "express";
import moment from "moment-timezone";
import Users from "../models/Users";
import GenericInterface from "../utils/genericInterface";

export default class ApiControllers {
    home = (req: Request, res: Response) => {
        res.status(200).render('generic.ejs', {
            pageTitle: 'Birthday Greetings',
            content: `<h1 class="text-center pt-5">Welcome<br/> Birthday Greetings API</h1>
                      <h5 class="text-center">Send Greetings to your loved ones on their birthdays</h5>`
        });
    }
    adjustTZ = (birthDay: string, timeZone: string) => {
        const userDatetime = birthDay + "09:00";
        const userTimezone = timeZone;
        const targetTimezone = "Asia/Jakarta";
        return moment.tz(userDatetime, 'YYYY-MM-DD HH:mm', userTimezone)
            .clone()
            .tz(targetTimezone)
            .format('YYYY-MM-DD HH:mm');
    }
    userAdd = (req: Request, res: Response) => {

        const adjustedBirthday = this.adjustTZ(req.body.birthDay, req.body.location);

        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDay: adjustedBirthday,
            email: req.body.email,
            location: req.body.location,
        };
        Users.create(data).then(user => {
            res.status(201).json({
                status: "OK",
                code: 201,
                message: "user has been added",
                payload: data
            });
        }).catch(error=>{
            res.status(500).json({
                status: "ERROR",
                code: 500,
                message: "data insert failed",
                payload: data,
                "error": error
            });
        });
    };
    userUpdate = (req: Request, res: Response) => {
        const id = req.params.userId;

        const adjustedBirthday = this.adjustTZ(req.body.birthDay, req.body.location);

        const upFirstName = req.body.firstName as string;
        const upLastName = req.body.lastName;
        const upBirthDay = adjustedBirthday;
        const upEmail = req.body.email;
        const upLocation = req.body.location;

        Users.findByPk(id, {rejectOnEmpty: true})
            .then((user :GenericInterface) => {
                user.firstName = upFirstName;
                user.lastName = upLastName;
                user.birthDay = upBirthDay;
                user.email = upEmail;
                user.location = upLocation;
                user.save();
                res.status(201).json({
                    status: "OK",
                    code: 201,
                    message: "user details has been updated",
                    payload: user
                });
            })
            .catch(error => {
                res.status(404).json({
                    status: "ERROR",
                    code: 404,
                    message: "no such user exist with id:" + id,
                    "error": error
                });
            })

    }
    userDelete = (req: Request, res: Response) => {
        const id = req.params.userId;
        Users.findByPk(id, {rejectOnEmpty: true})
            .then(user => {
                user?.destroy().then(()=>{
                    res.status(201).json({
                        status: "OK",
                        code: 201,
                        message: "user has been deleted",
                        payload: user
                    });
                })
            })
            .catch(error => {
                res.status(404).json({
                    status: "ERROR",
                    code: 404,
                    message: "no such user exist with id:" + id,
                    "error": error
                });
            })

    }
    error404 = (req: Request, res: Response) => {
        res.status(404).render('generic.ejs', {
            pageTitle: 'Page not found',
            content: `<h1 class="text-center pt-5">Error 404<br/> Page Not Found</h1>
                      <h5 class="text-center">Webpage you are looking for does not exist</h5>`
        });
    }
}