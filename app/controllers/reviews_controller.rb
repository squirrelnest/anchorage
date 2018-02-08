class ReviewsController < ApplicationController

  def index
    if params[:location_id]
      @reviews = Location.find_by(id: params[:location_id]).reviews
    else
      @reviews = Review.all
    end
  end

  def new
    @location = Location.find_by(id: params[:location_id]) || Location.new
    @review = Review.new
  end

  def create
    @review = Review.new(review_params)
    @location = Location.find_by(id: review_params["location_id"]) || Location.find_by(id: params[:location_id]) || Location.create(location_params)
    @review.location = @location
    @review.user_id = current_user.id
    if @review.valid?
      @review.save
      redirect_to locations_path
    else
      flash[:message] = @location.errors.messages.values.flatten.join(" ") if @location.errors.any?
      redirect_to locations_path
    end
  end

  def show
    @review = Review.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @review, status: 200 }
    end
  end

  def edit
    @review = Review.find(params[:id])
  end

  def update
    @review = Review.find(params[:id])
    if @review.user_id == @user.id || current_user.admin
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
    if @review.user_id == @user.id || current_user.admin
      @review.destroy
      redirect_to locations_url
    else
      flash[:message] = "Can't touch what ain't yours."
      redirect_to locations_url
    end
  end

  private

  def review_params
    params.require(:review).permit(:content, :stability, :date_visited, :location_id)
  end

  def location_params
    params.permit(:nickname, :lon, :lat, :country, reviews_attributes: [:date_visited, :stability, :content])
  end

end
