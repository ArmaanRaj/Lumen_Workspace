#include<bits/stdc++.h>

using namespace std;

string solution(string &forth) {
    // Implement your solution here
    int n = forth.size() ; 
    int max_left = 0; 
    int x=0; 
    int max_right = 0; 
    int height = 0; 
    for(int i=0 ; i<n ; i++){
        if(forth[i] == 'N') height++; 
        else if(forth[i] == 'W'){
            x--; 
        }
        else x++; 
        if(x<0){
            //matlab west ko change kr sakte hein 
            max_left = max(max_left , abs(x)) ; 
        }
        else{
            max_right= max(max_right , abs(x)) ; 
        }
    }
    //you can have two paths 
    //either left and right
    int ans1 = ((max_right+1-x) + (height) + (max_right+1)) ; 
    int ans2 = ((max_left+1+x) + (height) + (max_left+1)); 
    string ans = "" ; 
    if(ans1<=ans2){
        for(int i=0 ; i<(max_right+1-x) ; i++){
            ans.push_back('E'); 
        }
        for(int i=0 ; i<height ; i++){
            ans.push_back('S'); 
        }
        for(int i=0 ; i<(max_right+1) ; i++){
            ans.push_back('W') ; 
        }
    }
    else{
        for(int i=0 ; i<(max_left+1+x) ; i++){
            ans.push_back('W'); 
        }
        for(int i=0 ; i<height ; i++){
            ans.push_back('S'); 
        }
        for(int i=0 ; i<(max_left+1) ; i++){
            ans.push_back('E'); 
        }
    }
    return ans ; 
}

int main(){
    string ans = solution("NN"); 
    cout<<ans; 
}