desc "index models tracked by fuzzy search"
task 'index' => :environment do
	Indexer.index_models
end