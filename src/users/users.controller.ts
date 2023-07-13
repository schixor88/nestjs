import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './user.dto';
import { UpdateUserDto } from './update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private service:UsersService){}

    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
         this.service.create(body.email, body.password);
    }

    @Get("/:id")
    async findUser(@Param("id") id:string){
        const user = await this.service.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found')
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email:string){
        return this.service.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.service.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body:UpdateUserDto){
            return this.service.update(parseInt(id), body);
    }

}
