import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {  InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    //di
    constructor(@InjectRepository(User) private repo:Repository<User>){

    }

    //we create a function that can access the repo and save a user
    create(email:string, password:string){
    //we make a user from email and password as an instance of entity
     const user =  this.repo.create({email, password})  
     //we pass the entity to repo for saving it
     return this.repo.save(user);
    }


    //return object
    findOne(userId:number){
        return this.repo.findOne({where:{id:userId}});
    }


    //return array
    find(userEmail:string){
        return this.repo.find({
            where:{
                email:userEmail
            }
        })
    }

    //udpate the existing user
    async update(id:number, attrs: Partial<User>){
        //partial is a type helper is given by ts, it refrences User entity
        //attrs is short for attributes
        //attrs can be any object which has few or none prop of user 
        //but if you give prop to partial, which doesnot belong to User, error is given
        //---
        //find the user to update
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('user not found');
        }
        //takes all prop to atts to write into the found user
        Object.assign(user,attrs);
        //save the updated user entity
        return this.repo.save(user);
    }

    //remove user if present
    async remove(id:number){
        const user = await this.findOne(id);
        if(!user){
            throw new NotFoundException('user not found');

        }
        return this.repo.remove(user);
    }



}
