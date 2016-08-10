require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  def setup
  @user = users(:michael)
  end

  test "login with invalid information" do
      get demo_index_path
      assert_template 'demo'
      post user_session_path, {email: "",password: ""}

  end
end