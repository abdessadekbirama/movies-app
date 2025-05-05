import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMoviesDetails } from "@/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}
const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="w-full flex-col mt-2 gap-3">
    <Text className="text-xl text-[#b6b2b2]">{label}</Text>
    <Text className="text-white">{value}</Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() =>
    fetchMoviesDetails(id as string)
  );

  return (
    <View className="bg-[#180119] flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: movie?.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://plachold.co/600x400/1a1a1a/ffffff.png",
            }}
            className="w-full h-[500px]"
            resizeMode="stretch"
          />
        </View>
        <View className="flex-col items-start justify-center mt-5 px-5">
          <Text className="text-white text-xl font-bold">{movie?.title}</Text>
          <View className="flex-col items-start justify-center gap-4">
            <Text className="text-[#e9e7e7]">
              {movie?.release_date?.split("-")[0]}
            </Text>
            <View className="flex-row text-xs items-center gap-1 bg-[#e6b9f94d] rounded p-1">
              <Image source={icons.star} />
              <Text className="text-white">
                {Math.round(movie?.vote_average ?? 0)}/10
              </Text>
              <Text className="text-white">({movie?.vote_count} votes)</Text>
            </View>
            <MovieInfo label="Overview" value={movie?.overview} />
            <MovieInfo
              label="Genres"
              value={movie?.genres.map((g) => g.name).join(" - ")}
            />
            <View className="flex-row flex justify-between w-1/2">
              <MovieInfo
                label="Budget"
                value={`$ ${movie?.budget / 1000000 || " N/A"} million`}
              />
              <MovieInfo
                label="Revenue"
                value={`$ ${Math.round(movie?.revenue) / 1000000}`}
              />
            </View>
            <MovieInfo
              label="Production Companies"
              value={movie?.production_companies.map((c) => c.name).join(" - ")}
            />
          </View>
        </View>
        <TouchableOpacity
        onPress={router.back}
        className="flex-row absolute bg-[#6733ea] bottom-0 items-center w-full justify-center">
          <Image
            source={icons.arrow}
            tintColor="white"
            className="size-5 m-5 rotate-180"
          />
          <Text className="text-white text-xl">Go back</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MovieDetails;
