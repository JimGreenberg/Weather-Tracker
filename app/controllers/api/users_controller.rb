class Api::UsersController < ApplicationController

  def show
    @user = User.includes(:cities).find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      render "api/users/show"
    else
      render json: @user.errors, status: 422
    end
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

end
