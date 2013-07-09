require "utilities"

desc "index models tracked by fuzzy search"
task 'index' => :environment do
	FuzzySearchIndexer.index_models
end