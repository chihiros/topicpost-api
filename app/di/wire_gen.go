// Code generated by Wire. DO NOT EDIT.

//go:generate go run -mod=mod github.com/google/wire/cmd/wire
//go:build !wireinject
// +build !wireinject

package di

import (
	"app/interface/controller"
	"app/interface/repository"
	"app/usecase"
)

// Injectors from wire.go:

// プロバイダーセット
func InitializeUserController() *controller.UserController {
	userRepository := repository.NewUserRepository()
	userUsecase := usecase.NewUserUsecase(userRepository)
	userController := controller.NewUserController(userUsecase)
	return userController
}
