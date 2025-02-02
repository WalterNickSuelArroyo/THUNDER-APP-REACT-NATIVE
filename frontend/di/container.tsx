import { asClass, createContainer } from "awilix";
import { AuthService } from "../data/sources/remote/services/AuthService";
import { AuthRepositoryImpl } from "../data/repository/AuthRepositoryImpl";
import { LoginUseCase } from "../domain/useCases/auth/LoginUseCase";
import { LoginViewModel } from "../presentation/screens/auth/login/LoginViewModel";
import { RegisterViewModel } from "../presentation/screens/auth/register/RegisterViewModel";
import { RegisterUseCase } from "../domain/useCases/auth/RegisterUseCase";
import { LocalStorage } from "../data/sources/local/LocalStorage";
import { SaveAuthSessionUseCase } from "../domain/useCases/auth/SaveAuthSessionUseCase";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { GetAuthSessionUseCase } from "../domain/useCases/auth/GetAuthSessionUseCase";
import { RemoveAuthSessionUseCase } from "../domain/useCases/auth/RemoveAuthSessionUseCase";
import { AuthUseCases } from "../domain/useCases/auth/AuthUseCases";

const container = createContainer();

container.register({
    authService: asClass(AuthService).singleton(),
    localStorage: asClass(LocalStorage).singleton(),


    authRepository: asClass(AuthRepositoryImpl).singleton(),


    loginUseCase: asClass(LoginUseCase).singleton(),
    registerUseCase: asClass(RegisterUseCase).singleton(),
    saveAuthSessionUseCase: asClass(SaveAuthSessionUseCase).singleton(),
    getAuthSessionUseCase: asClass(GetAuthSessionUseCase).singleton(),
    removeAuthSessionUseCase: asClass(RemoveAuthSessionUseCase).singleton(),
    authUseCases: asClass(AuthUseCases).singleton(),
    
    loginViewModel: asClass(LoginViewModel).singleton(),
    registerViewModel: asClass(RegisterViewModel).singleton(),
});

export { container };