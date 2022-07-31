import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { hasUncaughtExceptionCaptureCallback } from 'process';
import {User} from './user.entity';
import { SimpleConsoleLogger } from 'typeorm';


let service: AuthService;
let fakeUsersService: Partial<UsersService>;

describe('AuthService', () => {
    


    beforeEach(async () => {
        const users: User[] = [];
        const fakeUsersService: Partial<UsersService> = {
            find: (email:string) => {
                const filteredUsers = users.filter(user => user.email === email)
                return Promise.resolve(filteredUsers);
            }, // it is asynchronous !!
            create: (email: string, password: string) =>{

                const user = {id: Math.floor(Math.random()* 99999), email, password};
                users.push(user);
                return Promise.resolve(user);
            }
              //Promise.resolve({ id: 1, email, password } as User), // it is asynchronous !!
          };
          // create module
          const module = await Test.createTestingModule({
            providers: [AuthService
            {
                provide:UsersService,
                useValue: fakeUsersService,
            }],
            
          }).compile();
          const service = module.get(AuthService);
    })
    // create temporary di container
    it('can create an instsance of auth service', async () => {
      // create a fake copy of the users service
    
      
      
      
    
    expect(service).toBeDefined();
    it('creates a new user with a salted and hashed password', async()=>{
    const user = await service.signup('asdf@asdf.com','asdf')
    expect(user.password).not.toEqual('asdf');
    const [salt, hash] = user.password.split("$");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
    })
    // conflict, service needs different requirements
    it('throws an error if user signs up with email that is in use ', async(done)=>{
        await service.signup('asdf@asdf.com','asdf')
        try{ await service.signup('asdf@asdf.com','asdf')
    }catch (err) {
        done();
    }
    })
    it('throws if signin is called with an unused email', async(done)=>{
        
        try{ await service.signin('asdf@asdf.com','asdf')
    }catch (err) {
        done();
    }
    })
    it('throws if an invalid password is provided', async(done)=>{
        await service.signup('asdf@asdf.com','asdf')
        try{
            await service.signin('asdf@asdf.com','password')
    }catch (err) {
        done();
    }
    })

    it('returns a user if correct password is provided', async(done)=>{
        
        await service.signup('asdf@asdf.com', 'password');
        const user = await service.signin('asdf@asdf.com', 'password');
        expect(user).toBeDefined();
    })
})
    
});
