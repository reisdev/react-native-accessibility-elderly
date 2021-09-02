require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-elderly"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.description  = <<-DESC
                  react-native-elderly
                   DESC
  s.homepage     = "https://github.com/reisdev/react-native-elderly
  s.license    = { :type => "GNU", :file => "LICENSE" }
  s.authors      = { "Matheus Reis" => "matheusdrdj@gmail.com" }
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/reisdev/react-native-elderly.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,c,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  # ...
  # s.dependency "..."
end

