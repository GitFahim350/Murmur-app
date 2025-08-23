module Api
  class MurmursController < BaseController
    # GET /api/murmurs?all=1 (optional global feed)
    # default: show latest regardless of follow (can be used for explore)
    def index
      scope = Murmur.includes(:user).order(created_at: :desc)
      render_collection(scope)
    end

    # GET /api/timeline
    def timeline
      ids = @current_user.following.select(:id)
      scope = Murmur.includes(:user).where(user_id: ids).order(created_at: :desc)
      render_collection(scope)
    end

    # GET /api/murmurs/:id
    def show
      m = Murmur.includes(:user).find(params[:id])
      liked_by_me = Like.exists?(user_id: @current_user.id, murmur_id: m.id)
      render json: m.as_json(only: [:id, :content, :likes_count, :created_at], include: { user: { only: [:id, :name, :username] } }).merge(liked_by_me:)
    end

    # POST /api/me/murmurs
    def create
      m = @current_user.murmurs.build(content: params[:content])
      if m.save
        render json: m, status: :created
      else
        render json: { errors: m.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # DELETE /api/me/murmurs/:id
    def destroy
      m = Murmur.find(params[:id])
      return render json: { error: 'forbidden' }, status: :forbidden if m.user_id != @current_user.id
      m.destroy
      head :no_content
    end

    # GET /api/users/:id/murmurs
    def by_user
      user = User.find(params[:id])
      scope = user.murmurs.includes(:user).order(created_at: :desc)
      render_collection(scope)
    end

    # GET /api/me/murmurs
    def mine
      scope = @current_user.murmurs.includes(:user).order(created_at: :desc)
      render_collection(scope)
    end
  end
end
