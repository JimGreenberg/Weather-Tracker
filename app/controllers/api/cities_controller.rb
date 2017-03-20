class Api::CitiesController < ApplicationController

  def index
    @cities = City.all
    render :index
  end

  def show
    @city = City.find(params[:id])
    render :show
  end

  def create
    @city = City.new(city_params)
    if @city.save
      render :show
    else
      render json: @city.errors, status: 422
    end
  end

  def update
    @city = City.find(params[:id])
    if @city.update(user_params)
      render :show
    else
      render json: @city.errors, status: 422
    end
  end

  def destroy
    @city = City.find(params[:id])
    if @city.destroy
      render :show
    else
      render json: @city.errors.full_messages, status: 422
    end
  end

  private
  def city_params
    params.require(:city).permit(:name, :user_id, :min, :max, :id)
  end
end
