module Api
  class BaseController < ApplicationController
    before_action :set_current_user

    private

    def set_current_user
      uid = request.headers['X-User-Id'] || params[:current_user_id]
      @current_user = User.find_by(id: uid) || User.first
    end

    def paginate(scope)
      page = params[:page].to_i
      page = 1 if page < 1
      per = 10
      total = scope.count
      items = scope.limit(per).offset((page - 1) * per)
      [items, { page: page, per_page: per, total: total, total_pages: (total.to_f / per).ceil }]
    end

    def render_collection(scope, include_user: true)
      items, meta = paginate(scope)
      render json: {
        data: items.as_json(
          only: %i[id content likes_count created_at],
          include: (include_user ? { user: { only: %i[id name username] } } : {})
        ),
        meta: meta
      }
    end
  end
end