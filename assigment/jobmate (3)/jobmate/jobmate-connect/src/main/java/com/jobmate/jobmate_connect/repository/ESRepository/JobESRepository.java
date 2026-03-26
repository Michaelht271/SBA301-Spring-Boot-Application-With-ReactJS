package com.jobmate.jobmate_connect.repository.ESRepository;

import com.jobmate.jobmate_connect.entity.eslasticsearch.JobES;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobESRepository extends ElasticsearchRepository<JobES, String> {
}
