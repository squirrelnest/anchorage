class ReviewsController < ApplicationController

  def index
    @reviews = Review.all
  end

  def new
    @review = Review.new
  end

  def create
    @review = Review.create(review_params)
    unless params[:location_id]
      @location = Location.create(location_params)
      @location.save
      @review.location = @location
    end
    @review.user = @user
    @review.save
    redirect_to location_path(@review.location)
  end

  def show
    @review = Review.find(params[:id])
  end

  def edit
    @review = Review.find(params[:id])
  end

  def update
    @review = Review.find(params[:id])
    if @review.user_id == @user.id
      @review.location.update(location_params)
      @review.update(review_params)
      @review.save
      redirect_to review_path(@review)
    else
      flash[:message] = "Can't touch what ain't yours."
      redirect_to review_path(@review)
    end
  end

  def destroy
    @review = Review.find(params[:id])
    if @review.user_id == @user.id
      @review.destroy
      redirect_to reviews_url
    else
      flash[:message] = "Can't touch what ain't yours."
      redirect_to reviews_url
    end
  end

  private

  def review_params
    params.permit(:content, :stability, :date_visited, :location_id)
  end

  def location_params
    params.permit(:nickname, :lon, :lat)
  end

end
