require 'fileutils'
require "curb"

extension = ".png"

sets = ["Double","Triple"]
vertical = ["Up","Down"]
horizontal = ["Left","Middle","Right"]

def download_file( path, filename )
  root_url = "http://launch.smash.org.au/"
  content = Curl::Easy.perform(root_url+path+filename)
  unless /404/.match(content.body_str)
    FileUtils.mkdir_p("#{path}")
    file = File.open("#{path}#{filename}", 'w') do |f| 
      begin
        f.write content.body_str
        puts "Saved #{path}#{filename}"
      rescue
        puts "Failed to write #{path}#{filename}"
      end
    end
  else
    puts "Did not find #{path}#{filename}"
  end
end

sets.each do |s|
  vertical.each do |v|
    horizontal.each do |h|
      (0..9).each do |n|
        download_file( "#{s}/#{v}/#{h}/", "#{n}#{extension}" )
      end
    end
  end
end