module Api
  class UsersController < BaseController
    def me
      u = @current_user
      puts u;
      render json: serialize_user(u)
    end

    def show
      u = User.find(params[:id])
      render json: serialize_user(u).merge(is_following: @current_user.following.exists?(u.id))
    end

    private

    def serialize_user(u)
      {
        id: u.id,
        name: u.name,
        username: u.username,
        bio: u.bio,
        following_count: u.following.count,
        followers_count: u.followers.count
      }
    end
  end
end
