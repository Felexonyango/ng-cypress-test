import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/interfaces/auth.guard";
import { UserService } from "../service/user.service";
import { User } from "../model/user.model";
@Controller('user')
@UseGuards(JwtAuthGuard)
// @Role(Roles.SUPERVISOR)
@ApiTags('users')
@ApiBearerAuth('jwt')
export class UserController {

   constructor(private userService:UserService){}

   @Get()
   async getUsers(){
      return await this.userService.getUsers();
   }

   @Get(':id')
   async getSingleUser(@Param('id') id:string){
      return await this.userService.findSingleUser(id);
   }

   @Post()
   async postUser(@Body() data:User){
      return await this.userService.postUser(data);
   }

   @Post(':id')
   async updateUser(@Param('id') id:string, @Body() data:Partial<User>) {
      return await this.userService.updateUser(id, data);
   }

   @Delete(':id')
   async deleteUser(@Param('id') id:string) {
      return await this.userService.deleteUser(id);
   }
}