import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }));

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-[#190123] px-5">
      <Image className="absolute w-full z-0 bg-cover" source={images.bg} />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        numColumns={3}
        keyExtractor={(item) => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <SearchBar
                placeholder="Search movies ..."
                onChangeText={(text: string) => setSearchQuery(text)}
                value={searchQuery}
              />
              {moviesLoading && (
                <ActivityIndicator
                  size="large"
                  color="white"
                  className="my-3"
                />
              )}
              {moviesError && (
                <Text className="text-red-500 px-5 my-3">
                  Error : {moviesError.message}
                </Text>
              )}
              {!moviesLoading &&
                !moviesError &&
                searchQuery.trim() &&
                movies?.length > 0 && (
                  <Text className="text-white text-lg">
                    Search results for
                    <Text className="text-[#ff0b91] font-semibold">
                      {" "}
                      {searchQuery}
                    </Text>
                  </Text>
                )}
            </View>
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View>
              <Text className="text-white text-lg text-center">
                {searchQuery.trim()
                  ? "No movies found !"
                  : "Search for movies ..."}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default search;
