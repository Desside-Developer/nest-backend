import {IsString, MinLength, MaxLength, IsEmail} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(6)
    @MaxLength(20)
    // @Mathes( {
    //     message: 'Password too week';
    // })
    password: string;

    @IsEmail()
    email: string;
}